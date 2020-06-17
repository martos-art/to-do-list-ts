import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" |  "active" | "completed";

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "JS", isDone: true},
        {id: 2, title: "JSX", isDone: true},
        {id: 3, title: "TSX", isDone: false},
        {id: 4, title: "react native", isDone: true},
    ]);

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");
    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title="first"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
