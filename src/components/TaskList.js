import React from 'react'; // Importing React
import Task from './Task'; // Importing the Task component

// Defining the TaskList component
const TaskList = ({ tasks, notes, approveTask, deleteTask, addNote, updateTask, updateNote, toggleNoteCompletion }) => {
    // Ensuring updateNote is passed as a prop

    return (
        <div className="task-list">
            {tasks.map(task => (
                <Task
                    key={task.id} // Providing a unique key for each task
                    task={task} // Passing the task object as a prop
                    notes={notes[task.id] || []} // Passing the notes associated with the task
                    approveTask={approveTask} // Passing the approveTask function
                    deleteTask={deleteTask} // Passing the deleteTask function
                    addNote={addNote} // Passing the addNote function
                    updateTask={updateTask} // Passing the updateTask function
                    updateNote={updateNote} // Passing the updateNote function
                    toggleNoteCompletion={toggleNoteCompletion} 
                />
            ))}
        </div>
    );
};

export default TaskList; // Exporting the TaskList component
