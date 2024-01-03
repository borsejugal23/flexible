import { useState } from "react"
import "../Style/board.css"
import Note from "./Note";
export const Board=()=>{
    const [notes, setNotes] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const addNote = () => {
    const newNote = {
      id: idCounter,
      text: 'New Note',
      isPinned: false,
    };
    setIdCounter(idCounter + 1);
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const editNote = (id, newText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
  };

  const togglePin = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
  };
 return  <>
  <div className="title"><strong><i>Notice Board</i></strong></div>
 <div className="container">
 <button className="add-btn" onClick={addNote} >+</button>
 {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          onDelete={deleteNote}
          onEdit={editNote}
          onPin={togglePin}
          isPinned={note.isPinned}
        />
      ))}

</div>
 </>
}