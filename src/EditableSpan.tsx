import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState(props.title)
    const activateEditMode = () =>{
        setEditMode(true)
        setTitle(props.title)
    }
    const disableEditMode = () =>{
        setEditMode(false)
        props.saveNewTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }
    const onAddItemKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            disableEditMode()
        }
    }
return(
    editMode ? <input value={title} autoFocus onBlur={disableEditMode} onChange={onChangeHandler} onKeyPress={onAddItemKeyPressed}/> : <span onDoubleClick={activateEditMode} > {props.title} </span>

)
}

export default EditableSpan;
