import React from 'react';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task Stories',
    component: Task
}

const removeCallback = action('Remove Callback')
const changeStatusCallback = action('Change Status')
const changeTitleCallback = action('Title changed inside Task')

export const TaskBaseExample = (props: any) => {
    return (
        <div>
        <Task task={{id: "1", isDone: true, title: 'Css'}} onChangeHandler={changeStatusCallback}
              changeTaskTitle={changeTitleCallback} onClickHandler={removeCallback}
        />
        <Task task={{id: "2", isDone: false, title: 'HTML'}} onChangeHandler={changeStatusCallback}
              changeTaskTitle={changeTitleCallback} onClickHandler={removeCallback}
        />
        <Task task={{id: "3", isDone: true, title: 'React'}} onChangeHandler={changeStatusCallback}
              changeTaskTitle={changeTitleCallback} onClickHandler={removeCallback}
        />

        </div>
    )
}
