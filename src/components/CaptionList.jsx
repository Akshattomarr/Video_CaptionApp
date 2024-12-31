import React from "react";
import "../styles/App.css";

const CaptionList = ({ captions, removeCaption }) => {
  return (
    <div className="caption-list">
      <h2>Captions</h2>
      <ul>
        {captions.map((caption) => (
          <li key={caption.id}>
            <span>
              {caption.start} - {caption.end}: {caption.text}
            </span>
            <button onClick={() => removeCaption(caption.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaptionList;
