import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    onChangeHandler:  (taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskId:string, newTitle: string) => void
    onClickHandler: (taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {task, onChangeHandler, changeTaskTitle, onClickHandler} = props

    const onClickHandlerDelete = () => {
        onClickHandler(task.id)
    }

    const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(task.id, e.currentTarget.checked)
    }

    const onTitleChangeHandler = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }

        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox color={"primary"} onChange={onChangeHandlerStatus} checked={task.isDone}/>
                <EditableSpan title={task.title} saveNewTitle={onTitleChangeHandler}/>
                <IconButton onClick={onClickHandlerDelete}>
                    <Delete/>
                </IconButton>
            </li>
        )
    }
);

