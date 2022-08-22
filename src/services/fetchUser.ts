export function fetchUser(username: string) {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
