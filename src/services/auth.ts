import { ICredentials } from "src/types";

export function login(credentials: ICredentials) {
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
