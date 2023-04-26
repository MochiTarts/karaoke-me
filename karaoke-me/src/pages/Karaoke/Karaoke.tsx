import React from 'react';
import './Karaoke.scss'
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

const Karaoke = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "";
  const data = params.get("data") || "";

  React.useEffect(() => {
    const handler = (event: any) => {
      // If the iframe is sending a message to the parent window
      if (event.origin === "https://www.youtube.com") {
        const data = JSON.parse(event.data);
        // If event is volume change. Keep volume muted.
        if (data.event === "onVolumeChange") {
          if (!data.info.muted) {
            const iframe = document.getElementById("youtube-player") as HTMLIFrameElement;
            iframe.contentWindow?.postMessage(JSON.stringify({
              event: "command",
              func: "mute",
              args: []
            }), "*");
          }
        }
      }
    }
    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    }
  }, []);

  const youtubeOnReady = (event: any) => {
    console.log("Youtube player ready");
  };
  const youtubeOnError = (event: any) => {
    console.log("Youtube player error");
    // Show audio player if youtube player fails to load
    const audio = document.getElementById("audio-player") as HTMLAudioElement;
    audio.classList.remove("hidden");
  };
  const youtubeStateChange = (event: any) => {
    // Update audio player to match youtube player
    const audio = document.getElementById("audio-player") as HTMLAudioElement;
    const data = JSON.parse(event.data);
    // Pause audio if youtube player is paused or buffering. Play audio if youtube player is playing (from the corresponding time).
    if (data === 2 || data === -1 || data === 3 || data === 5) {
      audio.pause();
    } else if (data === 1) {
      const currentTime = event.target.getCurrentTime();
      audio.currentTime = currentTime;
      audio.play();
    } else {
      return;
    }
  };

  return (
    <div id="karaoke-container">
      {type === "youtube" ? (
        <div className="youtube-player-container">
          <YouTube
            videoId={data ? data : ""}
            id="youtube-player"
            className="youtube-player-container"
            iframeClassName='youtube-player'
            title='youtube-player'
            loading='lazy'
            opts={{
              playerVars: {
                enablejsapi: 1,
                fs: 0,
              }
            }}
            onReady={youtubeOnReady}
            onError={youtubeOnError}
            onStateChange={youtubeStateChange}
          />
          <audio id="audio-player" controls>
            <source src="https://docs.google.com/uc?export=download&id=13cUpwgA7o0caYK-CssHLnfkiAzxaVfvd" type="audio/mp3" />
          </audio>
        </div>
      ) : type === "video" ? (
        <video id="video-player" controls>
          <source src={data ? data : ""} type="video/mp4" />
        </video>
      ) : (
        <h1>We're sorry, something went wrong.</h1>
      )}
    </div>
  );
};

export default Karaoke;