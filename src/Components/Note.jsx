import React, { useRef, useState } from 'react';
import '../Style/notes.css'; 

const Note = ({ id, text,onDelete, onEdit, onPin, isPinned }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [allowMove, setAllowMove] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  
  const stickyNoteRef = useRef();

  const handleDelete = () => {
    onDelete(id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEdit(id, noteContent);
  };

  const handlePin = () => {
    onPin(id);
    isPinned=!isPinned
    console.log(isPinned)
  };

  const handleMouseDown = (e) => {
    setAllowMove(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setDx(e.clientX - dimensions.x);
    setDy(e.clientY - dimensions.y);
  };

  const handleMouseMove = (e) => {
    if (allowMove ) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.current.style.left = x + "px";
      stickyNoteRef.current.style.top = y + "px";
    }
  };

  const handleMouseUp = () => {
    setAllowMove(false);
  };

  return (
    <div
      className={`note ${isPinned ? 'pinned' : ''}`}
      ref={stickyNoteRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {isEditing ? (
        <textarea
          className="note-textarea"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          cols="30"
          rows="10"
        />
      ) : (
        <div onDoubleClick={handleDoubleClick} className="note-container">
          <div className="button-container">
            <button onClick={handlePin} style={{ fontSize: '15px' }}>
              {isPinned ? 'Unpin' : 'Pin'}
            </button>
            <span>Notice {id}</span>
            <button onClick={handleDelete} className="clear">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="20">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
          <div className="text-wrapper">
            <div className="text">{text}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
