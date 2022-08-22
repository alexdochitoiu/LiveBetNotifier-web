export function saveAlerts({ username, alerts }) {
  return fetch(`${process.env.REACT_APP_API_URL}/set-alerts`, {
    method: "POST",
    body: JSON.stringify({ username, alerts }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function saveAlertsActive({ username, active }) {
  return fetch(`${process.env.REACT_APP_API_URL}/toggle-alerts-active`, {
    method: "POST",
    body: JSON.stringify({ username, active }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
