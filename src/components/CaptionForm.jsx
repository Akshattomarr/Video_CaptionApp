import React, { useState } from "react";
import "../styles/App.css";

const CaptionForm = ({ addCaption }) => {
  const [text, setText] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !start || !end) return;
    addCaption(text, start, end);
    setText("");
    setStart("");
    setEnd("");
  };

  return (
    <form className="caption-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Caption text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Start timestamp (e.g., 00:01:00)"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="text"
        placeholder="End timestamp (e.g., 00:01:05)"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button type="submit">Add Caption</button>
    </form>
  );
};

export default CaptionForm;
