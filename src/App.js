import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const priorities = {
  low: { color: "#6DBF45", label: "Low" },
  medium: { color: "#FFD700", label: "Medium" },
  high: { color: "#FF6347", label: "High" },
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false, priority }]);
      setNewTask("");
      setPriority("low");
    }
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setEditingTask(index);
    setNewTask(tasks[index].text);
    setPriority(tasks[index].priority);
  };

  const saveEditedTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editingTask].text = newTask;
      updatedTasks[editingTask].priority = priority;
      setTasks(updatedTasks);
      setNewTask("");
      setPriority("low");
      setEditingTask(null);
    }
  };

  const closeModal = () => {
    setNewTask("");
    setPriority("low");
    setEditingTask(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className="task-form">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control"
        />
        <div className="input-group">
          <select
            className="custom-select"
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          >
            {Object.keys(priorities).map((key) => (
              <option key={key} value={key}>
                {priorities[key].label}
              </option>
            ))}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary btn-priority"
              type="button"
              style={{ backgroundColor: priorities[priority].color }}
            >
              Priority
            </button>
          </div>
        </div>
        {editingTask !== null ? (
          <>
            <button onClick={saveEditedTask} className="btn btn-warning mt-2">
              Save Changes
            </button>
            <button
              onClick={closeModal}
              className="btn btn-secondary mt-2 ml-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addTask} className="btn btn-primary mt-2">
            Add Task
          </button>
        )}
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <span>{task.text}</span>
            <div className="task-actions">
              <button onClick={() => toggleTaskStatus(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
              <button onClick={() => editTask(index)}>Edit</button>
            </div>
            <div
              className="task-priority"
              style={{ backgroundColor: priorities[task.priority].color }}
            ></div>
          </div>
        ))}
      </div>

      <div className="task-summary">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
      </div>
    </div>
  );
};

export default App;
