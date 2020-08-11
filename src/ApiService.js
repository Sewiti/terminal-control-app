import Axios from "axios";

export const Execute = (baseUrl, command) => {
  return Axios.post(`${baseUrl}/exec`, { command });
  // return fetch(, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ command })
  // });
};
