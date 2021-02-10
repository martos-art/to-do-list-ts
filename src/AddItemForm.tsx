import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField, Fab, Tooltip} from '@material-ui/core';
import {AddBox} from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add'

export type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() != "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem();
        }
    };
    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                error={!!error}
                label={"Title"}
                helperText={error}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            {/*<IconButton onClick={addItem}*/}
            {/*            size={"medium"}*/}
            {/*>*/}
            {/*    /!*<AddBox/>*!/*/}
            {/*    <AddIcon color="secondary"/>*/}
            {/*</IconButton>*/}
            <Tooltip title="Add"
                     placement="right">
                <Fab color="primary"
                     size={"small"}
                     onClick={addItem}
                >
                    <AddIcon/>
                </Fab>
            </Tooltip>
            {/*{error && <div className="error-message"> {error} </div>}*/}
        </div>
    )
}