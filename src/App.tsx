import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "JSX", isDone: true},
        {id: v1(), title: "TSX", isDone: false}
    ]);

    function removeTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    let [filter, setFilter] = useState<FilterValueType>("all")
    let taskForTodolist = tasks;
    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }
function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])

}

    return (
        <div className="App">
            <Todolist title="4to po 4em?"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>

        </div>
    );
}

export default App;
