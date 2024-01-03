import React, { useRef, useState } from 'react';
import '../Style/notes.css'; 

const Note = ({ id, text,  onDelete, onEdit, onPin, isPinned  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);
  const [Move, setMove] = useState(false);
  const stickyNoteRef = useRef();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleDelete = () => {
    onDelete(id)  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEdit(id, noteText);
  };

  const handlePin = () => {
    onPin(id);
    isPinned=!isPinned
    setMove(isPinned)
  };
   
  function handleMouseDown(e) {
    console.log(e.nativeEvent.screenX)
    setMove(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setX(e.nativeEvent.screenX - dimensions.x);
    setY(e.nativeEvent.screenY - dimensions.y);
  }

  function handleMouseMove(e) {

    if (Move) {
      const x_axis = e.nativeEvent.screenX - x;
      const y_axis = e.nativeEvent.screenY - y;
      
      stickyNoteRef.current.style.left = x_axis + "px";
      stickyNoteRef.current.style.top = y_axis + "px";
    }
  }

  function handleMouseUp() {
    setMove(false);
  }
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
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          cols="30"
          rows="10"
        />
      ) : (
        <div onDoubleClick={handleDoubleClick} className="note-container">
          <div className="button-container">
            <button onClick={handlePin} style={{fontSize:"15px"}}>{isPinned ? 'Unpin' : 'Pin'}</button>
            <span>Notice {id}</span>
            <button onClick={handleDelete} className='clear'><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
          </div>
          <div className='text'>{text}</div>
        </div>
      )}
    </div>
  );
};

export default Note;
