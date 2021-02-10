import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string,
    onChange: (newValue : string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)

    let [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const activateWiewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        // ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateWiewMode} autoFocus />
        ? <TextField value={title} variant="outlined" onChange={onChangeTitleHandler} onBlur={activateWiewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}