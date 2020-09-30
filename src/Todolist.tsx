import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
        console.log('Todolist called')

        const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter]);
        const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter]);
        const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter]);

        const removeTodoList = useCallback(() => {
                props.removeTodoList(props.id)
            }, [props.id, props.removeTodoList]
        )

        const addTask = useCallback((title: string) => {
                props.addTask(title, props.id)
            }, [props.id, props.addTask]
        );

        const changeTodoListTitle = useCallback((newTitle: string) => {
                props.changeTodoListTitle(props.id, newTitle)
            }, [props.id, props.changeTodoListTitle]
        )
        let tasksForTodolist = props.tasks

        if (props.filter === "active") {
            tasksForTodolist = props.tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.isDone === true);
        }

        const onClickHandler = useCallback((taskId: string) => props.removeTask(taskId, props.id),
            [props.id,props.removeTask])
        const onChangeHandler = useCallback((taskId:string, newIsDoneValue:boolean) => {
            props.changeTaskStatus(taskId, newIsDoneValue, props.id);
        },[props.id, props.changeTaskStatus])
        const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
            props.changeTaskTitle(taskId, newTitle, props.id)
        },[props.id, props.changeTaskTitle])

        return <div>
            <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {

                        return <Task onClickHandler={onClickHandler}
                                     onChangeHandler={onChangeHandler}
                                     changeTaskTitle={changeTaskTitle}
                                     task={t}
                        />
                    })
                }
            </ul>
            <div>
                <Button color={"default"} variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    }
)
