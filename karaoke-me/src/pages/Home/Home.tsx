import React from "react";
import './Home.scss';
import { API } from "../../services";
import { useNavigate, createSearchParams } from "react-router-dom";

const Home = (props: any) => {
  const [blobUrl, setBlobUrl] = React.useState(String);
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event);
    // Check if YouTube URL or Video File
    if (event.target[0].id === "youtube-url") {
      console.log(event.target[0].value)
      const youtubeUrl = event.target[0].value;
      const params = new URLSearchParams(youtubeUrl.split("?")[1]);
      console.log(params.get("v"));
      event.target[0].value = "";
      // Navigate to Karaoke page using React Router with these params: { type: "youtube", data: query string of youtubeUrl }
      navigate({
        pathname: "/karaoke",
        search: createSearchParams({ type: "youtube", data: params.get("v") || "" }).toString()
      });
      /*API.get_youtube_audio(youtubeUrl)
        .then((response: any) => {
          console.log("Success!")
          const blob = new Blob([response], { type: "audio/mpeg" });
          const blobUrl = URL.createObjectURL(blob);
          setBlobUrl(blobUrl);
        })
        .catch((error: any) => {
          console.log("error: " + error);
        });*/
    } else if (event.target[0].id === "video-upload") {
      const videoFile = event.target[0].files[0];
      console.log(videoFile);
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
              id="pills-video-file-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-video-file"
              type="button"
              role="tab"
              aria-controls="pills-video-file"
              aria-selected="false"
            >
              Upload Video
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
              </div>
              <button type="submit" value="Submit" className="btn btn-success">Submit</button>
              <div id="equalizer"></div>
            </form>
          </div>

          <div className="tab-pane fade" id="pills-video-file" role="tabpanel" aria-labelledby="pills-video-file-tab">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="video-upload" className="form-label">Upload a Video File</label>
                <input type="file" className="form-control" id="video-upload" required/>
              </div>
              <button type="submit" value="Submit" className="btn btn-success">Submit</button>
              <div id="equalizer"></div>
            </form>
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