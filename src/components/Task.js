import React, { useState } from 'react';
import ProgressBar from './ProgressBar'; // Import the ProgressBar component

const Task = ({ task, notes, approveTask, deleteTask, addNote, updateTask, updateNote, toggleNoteCompletion }) => {
    // State for managing task editing mode and text
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [taskText, setTaskText] = useState(task.text);
    const [noteText, setNoteText] = useState('');
    const [editNoteId, setEditNoteId] = useState(null);
    const [editNoteText, setEditNoteText] = useState('');

    const TASK_CHAR_LIMIT = 70; // Character limit for tasks
    const NOTE_CHAR_LIMIT = 50; // Character limit for notes

    // Check if all notes are completed
    const allNotesCompleted = notes.every(note => note.completed);

    // Calculate the completion percentage
    const completionPercentage = notes.length ? (notes.filter(note => note.completed).length / notes.length) * 100 : 0;

    // Handle task text change
    const handleTaskChange = (e) => {
        if (e.target.value.length <= TASK_CHAR_LIMIT) {
            setTaskText(e.target.value);
        }
    };

    // Save the edited task
    const saveTask = () => {
        if (taskText.trim().length > 0) {
            updateTask(task.id, { ...task, text: taskText });
            setIsEditingTask(false);
        }
    };

    // Handle note text change
    const handleNoteChange = (e) => {
        if (e.target.value.length <= NOTE_CHAR_LIMIT) {
            setNoteText(e.target.value);
        }
    };

    // Add a new note to the task
    const handleAddNote = () => {
        if (noteText.trim().length > 0) {
            addNote(task.id, noteText);
            setNoteText('');
        }
    };

    // Start editing a note
    const startEditNote = (note) => {
        setEditNoteId(note.id);
        setEditNoteText(note.text);
    };

    // Save the edited note
    const saveEditNote = () => {
        if (editNoteText.trim().length > 0) {
            updateNote(task.id, editNoteId, editNoteText);
            setEditNoteId(null);
            setEditNoteText('');
        }
    };

    // Handle the change of note text being edited
    const handleEditNoteChange = (e) => {
        setEditNoteText(e.target.value);
    };

    return (
        <div className={`task ${task.approved ? 'approved' : ''}`}>
            {isEditingTask ? (
                <>
                    <input
                        type="text"
                        value={taskText}
                        onChange={handleTaskChange}
                    />
                    <span>{taskText.length}/{TASK_CHAR_LIMIT}</span>
                    <button onClick={saveTask}>Save</button>
                </>
            ) : (
                <>
                    <h3>{task.text}</h3>
                    <button onClick={() => setIsEditingTask(true)}>Edit</button>
                </>
            )}
            <button onClick={() => approveTask(task.id)} disabled={!allNotesCompleted}>
                {task.approved ? 'Unapprove' : 'Approve'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            
            {/* Add the progress bar here */}
            <ProgressBar completionPercentage={completionPercentage} />

            <div className="notes-list">
                {notes.map((note, index) => (
                    <div key={note.id} className="note-item">
                        <span>{index + 1}. </span>
                        {editNoteId === note.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editNoteText}
                                    onChange={handleEditNoteChange}
                                />
                                <span>{editNoteText.length}/{NOTE_CHAR_LIMIT}</span>
                                <button onClick={saveEditNote}>Save</button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    checked={note.completed}
                                    onChange={() => toggleNoteCompletion(task.id, note.id)}
                                />
                                <div dangerouslySetInnerHTML={{ __html: note.text }} />
                                <button onClick={() => startEditNote(note)}>Edit</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Add note"
                value={noteText}
                onChange={handleNoteChange}
            />
            <span>{noteText.length}/{NOTE_CHAR_LIMIT}</span>
            <button onClick={handleAddNote}>Add Note</button>
        </div>
    );
};

export default Task;
