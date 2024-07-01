import React from 'react'; // Importing React
import Note from './Note'; // Importing the Note component

// Defining the NoteList component
const NoteList = ({ notes, taskId }) => {
    // This component receives two props: 'notes' and 'taskId'

    return (
        <div className="note-list">
            {/* Mapping over the notes array for the given taskId and rendering a Note component for each note */}
            {notes[taskId]?.map((note, index) => (
                <Note key={index} note={note} /> // Passing the note to the Note component and setting a unique key
            ))}
        </div>
    );
};

export default NoteList; // Exporting the NoteList component
