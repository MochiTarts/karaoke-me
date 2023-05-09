import React from "react";
import './Home.scss';
import { API } from "../../services";
import { useNavigate, createSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Home = (props: any) => {
  const [blobUrl, setBlobUrl] = React.useState(String);
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const checkGenerateKaraoke = event.target[1].checked;
    const checkGenerateLyrics = event.target[2].checked;
    if (checkGenerateKaraoke) localStorage.setItem("generateKaraoke", "true");
    if (checkGenerateLyrics) localStorage.setItem("generateLyrics", "true");
    // Check if YouTube URL or Audio File
    if (event.target[0].id === "youtube-url") {
      const youtubeUrl = event.target[0].value;
      const params = new URLSearchParams(youtubeUrl.split("?")[1]);
      event.target[0].value = "";

      if (checkGenerateKaraoke) {
        const formElement = document.getElementById("form-regular") as HTMLFormElement;
        formElement.classList.add("hidden");
        const formLoadingElement = document.getElementById("form-loading") as HTMLDivElement;
        formLoadingElement.classList.remove("hidden");
  
        const statusTextElement = document.querySelector("#form-loading .status-text") as HTMLDivElement;
        statusTextElement.innerText = "Fetching audio from YouTube...";
  
        API.get_youtube_audio(youtubeUrl)
          .then((response: any) => {
            const s3_obj_url = response.url;
            const bucket = s3_obj_url.split("/")[2].split(".")[0]
            const object_key = s3_obj_url.split("/").slice(3).join("/");
            API.presigned_url(bucket, object_key, "get").then((response: any) => {
              formElement.classList.remove("hidden");
              formLoadingElement.classList.add("hidden");
              //setBlobUrl(response.presigned_url);
  
              // Navigate to Karaoke page using React Router with these params: { type: "youtube", data: query string of youtubeUrl }
              navigate({
                pathname: "/karaoke",
                search: createSearchParams({ type: "youtube", data: params.get("v") || "" }).toString()
              });
            });
          })
          .catch((error: any) => {
            console.log("error: " + error);
          });
      } else {
        // Navigate to Karaoke page using React Router with these params: { type: "youtube", data: query string of youtubeUrl }
        navigate({
          pathname: "/karaoke",
          search: createSearchParams({ type: "youtube", data: params.get("v") || "" }).toString()
        });
      }
    } else if (event.target[0].id === "audio-upload") {
      const audioFile = event.target[0].files[0];
      console.log(audioFile);
      event.target[0].value = "";
    } else {
      console.log("Error: Invalid form submission");
      return;
    }
  }

  return (
    <div id="home-container">
      <h1 className="display-1">Karaoke-Me</h1>
      <p className="lead"><em>You provide the song, we'll handle the karaoke!</em></p>
      <div className="form-container">
        <div id="form-loading" className="hidden">
          <div className="progress-bar-container">
            <div className="status-text"></div>
            <div className="progress-bar">
              <LinearProgress color="secondary" />
            </div>
          </div>
        </div>

        <div id="form-regular" className="">
          <ul className="nav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-youtube-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-youtube"
                type="button"
                role="tab"
                aria-controls="pills-youtube"
                aria-selected="true"
              >
                YouTube Link
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-audio-file-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-audio-file"
                type="button"
                role="tab"
                aria-controls="pills-audio-file"
                aria-selected="false"
              >
                Upload Audio
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-youtube" role="tabpanel" aria-labelledby="pills-youtube-tab">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="youtube-url" className="form-label">Enter a YouTube URL</label>
                  <input type="text" className="form-control" id="youtube-url"
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                    required
                  />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="generate-karaoke" />
                    <label className="form-check-label" htmlFor="generate-karaoke">
                      Generate the instrumental (karaoke) for this song
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="generate-lyrics" />
                    <label className="form-check-label" htmlFor="generate-lyrics">
                      Generate the lyrics for this song
                    </label>
                  </div>
                </div>
                <button type="submit" value="Submit" className="btn btn-success">Submit</button>
                <div id="equalizer"></div>
              </form>
            </div>

            <div className="tab-pane fade" id="pills-audio-file" role="tabpanel" aria-labelledby="pills-audio-file-tab">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="audio-upload" className="form-label">Upload a Audio File</label>
                  <input type="file" className="form-control" id="audio-upload" required/>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="generate-karaoke" />
                    <label className="form-check-label" htmlFor="generate-karaoke">
                      Generate the instrumental (karaoke) for this song
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="generate-lyrics" />
                    <label className="form-check-label" htmlFor="generate-lyrics">
                      Generate lyrics for this song
                    </label>
                  </div>
                </div>
                <button type="submit" value="Submit" className="btn btn-success">Submit</button>
                <div id="equalizer"></div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {blobUrl.length > 0 &&
        <audio controls>
          <source src={blobUrl} type="audio/mpeg" />
        </audio>
      }
    </div>
  );
}

export default Home;