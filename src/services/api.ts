const API = () => {};
const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;
const aws_micro_endpoint = process.env.REACT_APP_AWS_MICRO_ENDPOINT;
const aws_splitter_endpoint = process.env.REACT_APP_AWS_SPLITTER_ENDPOINT;

const presigned_url = (bucket: string, key: string, action: string) => {
  const body = { bucket, key, action };
  return fetch(`${aws_micro_endpoint}/presigned-urls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => err);
}

const get_youtube_audio = (yt_url: string) => {
  const body = { url: yt_url };
  return fetch(`${aws_micro_endpoint}/youtube-dl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

const split_audio = (s3_obj_url: string) => {
  const body = { url: s3_obj_url };
  // aws_splitter_endpoint is a websocket. Set up a websocket connection to it.
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
  return fetch(`${backend_endpoint}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => err);
};

const test = (token: string) => {
  return fetch(`${backend_endpoint}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => err);
}

API.get_youtube_audio = get_youtube_audio;
API.me = me;
API.login = login;
API.logout = logout;
API.test = test;
API.presigned_url = presigned_url;

export default API;