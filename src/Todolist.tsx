import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


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

    changeTitleStatus: (id: string, newValue: string, todolistId: string) => void,
    changeTodolistTitle: (id: string, newValue: string, todolistId: string) => void,

    removeTodolist: (id: string) => void,
    filter: FilterValueType
}

export function Todolist(props: PropsType) {
    let addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolistClick = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onChangeTodolistTitleHandler = (newValue: string) => {
        props.changeTodolistTitle(props.id, newValue, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
                <span>
                    <IconButton onClick={removeTodolistClick}>
                        <Delete/>
                    </IconButton>
                </span>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>{                                    ///MAP
                props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(task.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTitleStatus(task.id, newValue, props.id)
                    }

                    return (
                        <div key={task.id} className={task.isDone ? "is-done" : ""}>
                            <Checkbox size={"small"}
                                      onChange={onChangeStatusHandler}
                                      checked={task.isDone}/>

                            <EditableSpan title={task.title}
                                          onChange={onChangeTitleHandler}
                            />
                            <IconButton size={"small"}
                                        onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    );
                })
            }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"}
                        onClick={onAllClickHandler}
                        color={"inherit"}
                        size={"small"}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}
                        color={"secondary"}
                        size={"small"}
                >Active
                </Button>
                <Button variant={props.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}
                        color={"primary"}
                        size={"small"}
                >Completed
                </Button>
            </div>
        </div>
    );
}

// let [title, setTitle] = useState<string>(""); //ВДУПЛИТЬ
// let [error, setError] = useState<string | null>(null)
//
// const onAddTaskClick = () => {
//     if (title.trim() != "") {
//         props.addTask(title.trim(), props.id);
//         setTitle("");
//     } else {
//         setError("Title is required")
//     }
// }

// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.currentTarget.value)
// }
// const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//     setError(null)
//     if (e.charCode === 13) {
//         onAddTaskClick();
//     }
// };
{/*<div>*/
}
{/*    <input value={title}*/
}
{/*           onChange={onChangeHandler}*/
}
{/*           onKeyPress={onKeyPressHandler}*/
}
{/*           className={error ? "error" : ""}*/
}
{/*    />*/
}
{/*    <button onClick={onAddTaskClick}> ADD</button>*/
}
{/*    {error && <div className="error-message"> {error} </div>}*/
}
{/*</div>*/
}