import React from 'react'; // Importing React

// Defining the Note component
const Note = ({ note }) => {
    // This component receives a single prop 'note'

    return (
        <div className="note">
            {/* Displaying the text of the note */}
            <span>{note.text}</span>
        </div>
    );
};

export default Note; // Exporting the Note component
