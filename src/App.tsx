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
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
export type TasksStateType = {
    [key: string] : Array<TaskType>
}

function App() {
    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "JSX", isDone: true},
    //     {id: v1(), title: "TSX", isDone: false}
    // ]);
    //let [filter, setFilter] = useState<FilterValueType>("all")
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "Есть задачи?", filter: "all"},
        {id: todolistId2, title: "Список прихотей", filter: "all"}
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JSX", isDone: true}],
        [todolistId2]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JSX", isDone: true}]
    });
    // function removeTask(id: string) {
    //     setTasks(tasks.filter(task => task.id !== id));
    // }
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValueType, todolistsId: string) {
        let todolist = todolists.find(tl => tl.id === todolistsId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    // function addTask(title: string) {
    //     let newTask = {id: v1(), title: title, isDone: false};
    //     setTasks([newTask, ...tasks])}
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    // function changeStatus(taskId: string, isDone: boolean) { /// Псевдоистина и псевдоложь
    //     let task = tasks.find(t => t.id === taskId)
    //     if (task) {
    //         task.isDone = isDone;
    //         setTasks([...tasks]);
    //     }
    // }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let allTodolistsTasks = tasks[tl.id];
                let taskForTodolist = allTodolistsTasks;
                //let taskForTodolist = tasks;

                if (tl.filter === "active") {
                    taskForTodolist = allTodolistsTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    taskForTodolist = allTodolistsTasks.filter(t => t.isDone === true)
                }
                return (
                    <Todolist
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        filter={tl.filter}
                    />)
            })
            }
        </div>
    );
}

export default App;
