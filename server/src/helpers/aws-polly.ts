import {
  StartSpeechSynthesisTaskCommand,
  SynthesizeSpeechCommand,
  Engine,
  LanguageCode,
  OutputFormat,
  SpeechMarkType,
  TextType,
  VoiceId,
  GetSpeechSynthesisTaskCommand,
} from "@aws-sdk/client-polly";
import { Readable } from "stream";

import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Polly } from "@aws-sdk/client-polly";

import debug from "debug";
const log = debug("mybyte-server:aws-polly");

// Create the Polly service client, assigning your credentials
const client = new Polly({
  region: process.env.AWS_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: process.env.AWS_REGION }),
    identityPoolId: process.env.IDENTITY_POOL_ID || "", // IDENTITY_POOL_ID
  }),
});

const getMarkerFile = async (fileUrl: string) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: fileUrl,
      headers: {},
    };

    const response = await axios.request(config);

    // Split the data into lines and parse each line as JSON
    const lines = response.data
      .split("\n")
      .filter((line: any) => line.trim() !== ""); // Remove empty lines
    const parsedData = lines.map((line: any) => JSON.parse(line));

    return parsedData; // Return the array of parsed markers
  } catch (error) {
    log("Error in getMarkerFile:", error);
    throw error;
  }
};

const pollTaskStatus = async (
  taskId: string,
  interval: number,
  maxAttempts: number
) => {
  let attempts = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  while (attempts < maxAttempts) {
    attempts++;

    try {
      const taskCommand = new GetSpeechSynthesisTaskCommand({ TaskId: taskId });
      const taskData = await client.send(taskCommand);

      const status = taskData.SynthesisTask?.TaskStatus;
      log(`Attempt ${attempts}: Task status is ${status}`);

      if (status === "completed") {
        log("Task completed successfully.");
        if (timeoutId) clearTimeout(timeoutId);
        return taskData.SynthesisTask; // Return the completed task data
      } else if (status === "failed") {
        throw new Error("Task failed.");
      }
    } catch (error) {
      log("Error while polling task status:", error);
    }

    await new Promise((resolve) => {
      timeoutId = setTimeout(resolve, interval);
    });
  }

  if (timeoutId) clearTimeout(timeoutId);
  throw new Error("Max attempts reached. Task status check timed out.");
};

export const getSpeechSynthesis = async (inputText: string): Promise<any> => {
  try {
    const audioInput = {
      Engine: Engine.NEURAL,
      LanguageCode: LanguageCode.en_IN,
      OutputFormat: OutputFormat.MP3,
      SampleRate: "16000",
      Text: inputText,
      TextType: TextType.TEXT,
      VoiceId: VoiceId.Brian,
    };

    const visemeInput = {
      Engine: Engine.NEURAL,
      LanguageCode: LanguageCode.en_IN,
      OutputFormat: OutputFormat.JSON,
      OutputS3BucketName: process.env.AWS_BUCKET_NAME,
      OutputS3KeyPrefix: "speech_",
      SpeechMarkTypes: [SpeechMarkType.VISEME],
      Text: inputText,
      TextType: TextType.TEXT,
      VoiceId: VoiceId.Brian,
    };

    // Get AudioStream
    const synthesizeSpeechCommand = new SynthesizeSpeechCommand(audioInput);
    const audioResponse = await client.send(synthesizeSpeechCommand);
    const audioStream = audioResponse.AudioStream as Readable;

    // Start Viseme Task
    const visemeCommand = new StartSpeechSynthesisTaskCommand(visemeInput);
    const visemeResponse = await client.send(visemeCommand);
    const taskId = visemeResponse.SynthesisTask?.TaskId;

    if (!taskId) throw new Error("Failed to retrieve viseme task ID");

    // Poll for task completion
    const synthesisTask = await pollTaskStatus(taskId, 2000, 20);
    if (synthesisTask?.TaskStatus === "completed") {
      const markerUrl = synthesisTask.OutputUri;
      if (!markerUrl) throw new Error("Failed to retrieve marker file URL");

      // Fetch and parse viseme markers
      const visemeMarkers = await getMarkerFile(markerUrl);
      return { audioStream, viseme: visemeMarkers };
    } else {
      throw new Error("Viseme synthesis task did not complete successfully");
    }
  } catch (error) {
    log("Error in speech synthesis:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};
