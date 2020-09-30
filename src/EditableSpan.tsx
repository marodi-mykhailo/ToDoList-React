import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
        console.log("EditableSpan called")
        let [editMode, setEditMode] = useState<boolean>(false)
        let [title, setTitle] = useState(props.title)
        const activateEditMode = () => {
            setEditMode(true)
            setTitle(props.title)
        }
        const disableEditMode = () => {
            setEditMode(false)
            props.saveNewTitle(title)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }
        const onAddItemKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.charCode === 13) {
                disableEditMode()
            }
        }
        return (
            editMode ?
                <TextField label={props.title} value={title} autoFocus onBlur={disableEditMode} onChange={onChangeHandler}
                           onKeyPress={onAddItemKeyPressed}/> :
                <span onDoubleClick={activateEditMode}> {props.title} </span>

        )
    }
)

