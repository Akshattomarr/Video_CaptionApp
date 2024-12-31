import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import CaptionForm from "./components/CaptionForm";
import CaptionList from "./components/CaptionList";
import "./styles/App.css";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);

  const addCaption = (text, start, end) => {
    setCaptions([...captions, { id: Date.now(), text, start, end }]);
  };

  const removeCaption = (id) => {
    setCaptions(captions.filter((caption) => caption.id !== id));
  };

  return (
    <div className="app">
      <h1>Video Caption App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      <VideoPlayer videoUrl={videoUrl} captions={captions} />
      <CaptionForm addCaption={addCaption} />
      <CaptionList captions={captions} removeCaption={removeCaption} />
    </div>
  );
};

export default App;
