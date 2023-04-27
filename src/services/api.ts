import { User, useAuth0 } from "@auth0/auth0-react";

const API = () => {};
const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

const get_youtube_audio = (url: string) => {
  console.log(backend_endpoint)
  const query_params = new URLSearchParams({ url });
  return fetch(`${backend_endpoint}/youtube-dl?${query_params}`)
    .then((res) => res.blob())
    .catch((err) => err);
};

const me = () => {
  return fetch(`${backend_endpoint}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => err);
};

const login = () => {
  return fetch(`${backend_endpoint}/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => err);
}

const logout = () => {
  return fetch(`${backend_endpoint}/api/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => err);
};

API.get_youtube_audio = get_youtube_audio;
API.me = me;
API.login = login;
API.logout = logout;

export default API;