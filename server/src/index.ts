import express, { Request, Response } from "express";
import { Server } from "http";
import cors from "cors";
import debug from "debug";
const logger = debug("mybyte-server:index");
import { configDotenv } from "dotenv";
configDotenv();

import winston from "winston";
import { getSpeechSynthesis } from "./helpers/aws-polly";

import { audioFileStream, helloViseme } from "./static/hello";

const log = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

const app = express();
let server: Server;

interface Item {
  id: number;
  name: string;
}

const items: Item[] = [];

app.use(express.json());
app.use(
  cors({
    origin: process.env.WEB_URL,
    exposedHeaders: ["x-viseme"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

interface SpeechRequestBody {
  text: string;
}

// app.post(
//   "/speech",
//   async (
//     req: Request<{}, {}, SpeechRequestBody>,
//     res: Response
//   ): Promise<void> => {
//     const { text } = req.body;

//     logger("input text: ", text);

//     if (!text) {
//       res.status(400).json({
//         message: "'text' parameter required",
//         error: "Bad request",
//       });
//       return;
//     }
//     try {
//       const { audioStream, viseme } = await getSpeechSynthesis(text);
//       // 3. Set viseme markers as custom headers
//       const visemeData = JSON.stringify(viseme);
//       res.setHeader("x-viseme", visemeData);
//       // 4. Stream the audio as the response body
//       res.setHeader("Content-Type", "audio/mpeg");
//       audioStream.pipe(res);
//     } catch (error: any) {
//       res.status(500).json({
//         message: "Internal Server Error",
//         error: error.message,
//       });
//     }
//   }
// );

app.post("/speech", async(req: Request, res: Response) => {
 try {
   const visemeData = JSON.stringify(helloViseme);
      res.setHeader("x-viseme", visemeData);
      // 4. Stream the audio as the response body
      res.setHeader("Content-Type", "audio/mpeg");

      audioFileStream.on('error' , (error) => {
        res.status(500).json({
          message: "Internal Server Error, Stream broken",
          error: error.message,
        });
      })

      audioFileStream.pipe(res);

    } catch (error: any) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }

});

// error handler middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
  logger(err.stack);
  res.status(500).send("Something broke!");
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger("Uncaught Exception:", error);
  gracefulShutdown("uncaughtException", 1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger("Unhandled Rejection:", error);
  gracefulShutdown("unhandledRejection", 1);
});

// Graceful shutdown function
const gracefulShutdown = (reason: string, exitCode = 0) => {
  logger(`Shutting down due to: ${reason}`);
  if (server) {
    server.close(() => {
      logger("HTTP server closed");
      process.exit(exitCode);
    });
  } else {
    process.exit(exitCode);
  }

  // Fallback for ongoing connections
  setTimeout(() => {
    logger("Forcing shutdown due to pending operations");
    process.exit(exitCode);
  }, 5000).unref(); // Prevents keeping the event loop active
};

// Start the Express server
const PORT = process.env.PORT || 3000;
server = app.listen(PORT, () => {
  logger(`Server running on port ${PORT}`);
});

// Handle signals (e.g., SIGINT for Ctrl+C, SIGTERM for Docker/Cloud shutdown)
process.on("SIGINT", () => gracefulShutdown("SIGINT", 0));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM", 0));
