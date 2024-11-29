export const getSpeech = (text: string): Promise<Response> =>
  new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ text });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${import.meta.env.VITE_SERVER_URL}/speech`, requestOptions)
      .then((response) => {
        if (response.ok) resolve(response);
        else reject(new Error("Failed to fetch speech data"));
      })
      .catch((error) => reject(error));
  });
