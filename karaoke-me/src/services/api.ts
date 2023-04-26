const API = () => {};
const youtube_api_endpoint = process.env.REACT_APP_YOUTUBE_ENDPOINT;

const get_youtube_audio = (url: string) => {
  console.log(youtube_api_endpoint)
  const query_params = new URLSearchParams({ url });
  return fetch(`${youtube_api_endpoint}?${query_params}`)
    .then((res) => res.blob())
    .catch((err) => err);
};

API.get_youtube_audio = get_youtube_audio;

export default API;