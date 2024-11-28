
type SpeechInput = {
  text: string;
};

export const getSpeech = ({ text }: SpeechInput): Promise<Response> =>
  new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      text: text
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${import.meta.env.VITE_SERVER_URL}/speech`, requestOptions)
      .then((response) => response.text())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
