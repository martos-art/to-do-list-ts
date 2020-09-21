import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

type  TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: string) => void,
    changeFilter: (value: FilterValueType) => void,
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState<string>(""); //ВДУПЛИТЬ
    const onAddTaskClick = () => {
        props.addTask(title);
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onAddTaskClick();
        }
    };
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={onAddTaskClick}> ADD</button>
            </div>
            <ul>{      ///MAP
                props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(task.id)
                    return (
                        <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}> X</button>
                        </li>
                    )
                })
            }
            </ul>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}