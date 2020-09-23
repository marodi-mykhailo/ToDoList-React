import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolisFiltertAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


    let todoListId1 = v1();
    let todoListId2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    // removing Task from todolist
    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }

    // removing Todolist
    function removeTodoList(todoListId: string) {
        dispatch(RemoveTodolistAC(todoListId))
    }

// add Todolist
    function addTodoList(title: string) {
        let action = AddTodolistAC(title)

        dispatch(action)

    }

// change Title for todolist
    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatch(ChangeTodolistTitleAC(todoListID, newTitle))
    }

// add Task  in todolist
    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }

// change filter value
    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(ChangeTodolisFiltertAC(todoListId, value))
    }

// change task status
    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todoListId))
    }

    // change task title
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    }


// set state for todolist


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={6}>
                    {todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;
                        debugger

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                        }
                        return <Grid item><Paper elevation={6} style={{padding: "10px"}}><Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            removeTodoList={removeTodoList}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        /></Paper></Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
