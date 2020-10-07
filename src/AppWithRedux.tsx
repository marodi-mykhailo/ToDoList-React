import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolisFiltertAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./AddItemForm";

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
    const removeTask = useCallback((id: string, todoListId: string) => {
            dispatch(removeTaskAC(id, todoListId))
        }, []
    )

    // removing Todolist
    const removeTodoList = useCallback((todoListId: string) => {
            dispatch(RemoveTodolistAC(todoListId))
        }, []
    )

// add Todolist
    const addTodoList = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }, [])

// change Title for todolist
    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
            dispatch(ChangeTodolistTitleAC(todoListID, newTitle))
        }, []
    )

// add Task  in todolist
    const addTask = useCallback((title: string, todoListId: string) => {
            dispatch(addTaskAC(title, todoListId))
        }, []
    )

// change filter value
    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
            dispatch(ChangeTodolisFiltertAC(todoListId, value))
        }, []
    )


// change task status
    const changeTaskStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
            dispatch(changeTaskStatusAC(id, isDone, todoListId))
        }, []
    )

// change task title
    const changeTaskTitle = useCallback((id: string, newTitle: string, todoListId: string) => {
            dispatch(changeTaskTitleAC(id, newTitle, todoListId))
        }, []
    )


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


                        return <Grid item><Paper elevation={6} style={{padding: "10px"}}><Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={allTodolistTasks}
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
