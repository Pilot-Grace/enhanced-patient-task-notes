import React, { useState, useEffect } from 'react'; // Importing React and hooks
import TaskList from './components/TaskList'; // Importing the TaskList component
import './MainApp.css'; // Importing CSS styles

const MainApp = () => {
    // State to hold the list of tasks
    const [tasks, setTasks] = useState([]);
    // State to hold the notes associated with each task
    const [notes, setNotes] = useState({});
    // State to hold the search text input
    const [searchText, setSearchText] = useState('');

    // useEffect to load saved tasks and notes from localStorage when the component mounts
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        const savedNotes = JSON.parse(localStorage.getItem('notes'));
        if (savedTasks) setTasks(savedTasks); // Set saved tasks to state
        if (savedNotes) setNotes(savedNotes); // Set saved notes to state
    }, []); // Empty dependency array means this runs once when the component mounts

    // useEffect to save tasks and notes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [tasks, notes]); // Dependency array includes tasks and notes, so this runs whenever they change

    // Function to add a new task
    const addTask = (taskText) => {
        const newTask = { id: Date.now(), text: taskText, approved: false }; // Create a new task object
        setTasks([...tasks, newTask]); // Add the new task to the list of tasks
    };

    // Function to approve or unapprove a task
    const approveTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, approved: !task.approved } : task // Toggle the approved state of the task
        ));
    };

    // Function to delete a task
    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId)); // Filter out the task with the given ID
        const updatedNotes = { ...notes };
        delete updatedNotes[taskId]; // Remove the notes associated with the deleted task
        setNotes(updatedNotes); // Update the notes state
    };

    // Function to add a note to a task
    const addNote = (taskId, noteText) => {
        const updatedNotes = { ...notes };
        if (!updatedNotes[taskId]) {
            updatedNotes[taskId] = []; // Initialize an array for notes if not already present
        }
        updatedNotes[taskId].push({ id: Date.now(), text: noteText, completed: false }); // Add the new note to the task's notes with a completed property
        setNotes(updatedNotes); // Update the notes state
    };

    // Function to update a task's text
    const updateTask = (taskId, updatedTask) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? updatedTask : task // Update the task with the given ID
        ));
    };

    // Function to update a note's text
    const updateNote = (taskId, noteId, noteText) => {
        const updatedNotes = { ...notes };
        const noteIndex = updatedNotes[taskId].findIndex(note => note.id === noteId); // Find the note by its ID
        updatedNotes[taskId][noteIndex].text = noteText; // Update the note's text
        setNotes(updatedNotes); // Update the notes state
    };
    
    // Toggle note completion status
    const toggleNoteCompletion = (taskId, noteId) => {
        const updatedNotes = { ...notes };
        const noteIndex = updatedNotes[taskId].findIndex(note => note.id === noteId);
        updatedNotes[taskId][noteIndex].completed = !updatedNotes[taskId][noteIndex].completed;
        setNotes(updatedNotes);
    };

    // Function to handle search input change
    const handleSearch = (event) => {
        setSearchText(event.target.value); // Update the search text state
    };

    // Filter tasks based on search text
    const filteredTasks = tasks.filter(task => {
        const taskMatches = task.text.toLowerCase().includes(searchText.toLowerCase()); // Check if the task text matches the search text
        const notesMatch = notes[task.id]?.some(note => note.text.toLowerCase().includes(searchText.toLowerCase())); // Check if any of the task's notes match the search text
        return taskMatches || notesMatch; // Return tasks that match either condition
    });

    return (
        <div className="app">
            <h1>Enhanced Patient Task and Notes App</h1>
            <div className="input-section">
                {/* Input field for typing a new task */}
                <input type="text" id="newTask" placeholder="New task" />
                {/* Button to add a new task */}
                <button onClick={() => addTask(document.getElementById('newTask').value)}>Add Task</button>
            </div>
            <div className="search-section">
                {/* Input field for searching tasks and notes */}
                <input
                    type="text"
                    placeholder="Search tasks and notes"
                    value={searchText}
                    onChange={handleSearch}
                />
            </div>
            {/* Render the list of filtered tasks */}
            <TaskList
                tasks={filteredTasks}
                notes={notes}
                approveTask={approveTask}
                deleteTask={deleteTask}
                addNote={addNote}
                updateTask={updateTask} // Passing updateTask function
                updateNote={updateNote} // Passing updateNote function
                toggleNoteCompletion={toggleNoteCompletion}
            />
        </div>
    );
};

export default MainApp; // Export the MainApp component
