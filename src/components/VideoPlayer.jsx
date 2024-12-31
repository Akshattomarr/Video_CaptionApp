import React, { useRef, useState } from "react";
import "../styles/App.css";

const VideoPlayer = ({ videoUrl, captions }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("");

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const activeCaption = captions.find(
        (caption) =>
          currentTime >= parseTimestamp(caption.start) &&
          currentTime <= parseTimestamp(caption.end)
      );
      setCurrentCaption(activeCaption ? activeCaption.text : "");
    }
  };

  const parseTimestamp = (timestamp) => {
    const [hours, minutes, seconds] = timestamp.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!isFullscreen) {
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen();
        } else if (playerRef.current.webkitRequestFullscreen) {
          playerRef.current.webkitRequestFullscreen();
        } else if (playerRef.current.mozRequestFullScreen) {
          playerRef.current.mozRequestFullScreen();
        } else if (playerRef.current.msRequestFullscreen) {
          playerRef.current.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div ref={playerRef} className="video-player-container">
      <div className="video-wrapper">
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              src={videoUrl}
              type="video/mp4"
              controls
              crossOrigin="anonymous"
            />
            {/* Render caption overlay only when there's a caption */}
            <div
              className="caption-overlay"
              style={{
                display: currentCaption ? "block" : "none",
              }}
            >
              {currentCaption}
            </div>
          </>
        ) : (
          <p>Enter a video URL above to watch the video.</p>
        )}
      </div>
      {videoUrl && (
        <>
          <button className="play-pause-btn" onClick={togglePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button className="fullscreen-btn" onClick={toggleFullscreen}>
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
