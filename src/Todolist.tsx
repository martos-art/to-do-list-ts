import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

type  TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValueType, todolistsId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void,
    removeTodolist: (id: string) => void,
    filter: FilterValueType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>(""); //ВДУПЛИТЬ
    let [error, setError] = useState<string | null>(null)

    const onAddTaskClick = () => {
        if (title.trim() != "") {
            props.addTask(title.trim(), props.id);
            setTitle("");
        } else {
            setError("Title is required")
        }
    }
    const removeTodolistClick = () => {
        props.removeTodolist(props.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            onAddTaskClick();
        }
    };
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return (
        <div>
            <h3>{props.title} <span> <button onClick={removeTodolistClick}>X</button> </span>
            </h3>

            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={onAddTaskClick}> ADD</button>
                {error && <div className="error-message"> {error} </div>}
            </div>
            <ul>{      ///MAP
                props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(task.id, props.id)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}> X</button>
                        </li>
                    )
                })
            }
            </ul>

            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}