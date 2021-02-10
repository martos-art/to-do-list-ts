import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, Toolbar, Typography, Paper} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

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
    [key: string]: Array<TaskType>
}

function App() {

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
            {id: v1(), title: "DONER KEBAB", isDone: false},
            {id: v1(), title: "PIZZA", isDone: false}]
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

    function changeTodolistTitle(id: string, newValue: string, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newValue;
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTitleStatus(id: string, newValue: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newValue;
            setTasks({...tasks});
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"};
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Tasks
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}
                    // justify="center"
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}
                    // direction="row"
                    // justify="center"
                    // alignItems="flex-start"
                >
                    {
                        todolists.map(tl => {
                            let allTodolistsTasks = tasks[tl.id];
                            let taskForTodolist = allTodolistsTasks;

                            if (tl.filter === "active") {
                                taskForTodolist = allTodolistsTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                taskForTodolist = allTodolistsTasks.filter(t => t.isDone === true)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}
                                           elevation={3}>
                                        <Todolist
                                            id={tl.id}
                                            key={tl.id}
                                            title={tl.title}
                                            tasks={taskForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            changeTitleStatus={changeTitleStatus}
                                            removeTodolist={removeTodolist}
                                            filter={tl.filter}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}

export default App;

// function changeStatus(taskId: string, isDone: boolean) { /// Псевдоистина и псевдоложь
//     let task = tasks.find(t => t.id === taskId)
//     if (task) {
//         task.isDone = isDone;
//         setTasks([...tasks]);
//     }
// }