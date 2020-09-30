import React, {useReducer, useState} from 'react';
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
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
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


function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    // set state for todolist
    let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
            {
                id: todoListId1,
                title: "What to learn",
                filter: "all"
            },
            {
                id: todoListId2,
                title: "What to buy",
                filter: "all"
            }
        ]
    )

    // set state for tasks
    let [tasksObj, dispatchToTask] = useReducer(tasksReducer, {
            [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: "milk", isDone: true},
                {id: v1(), title: "bread", isDone: true},
                {id: v1(), title: "oil", isDone: false},
                {id: v1(), title: "meat", isDone: false},
                {id: v1(), title: "salt", isDone: false},
            ]
        }
    )


    //


    // removing Task from todolist
    function removeTask(id: string, todoListId: string) {
        dispatchToTask(removeTaskAC(id,todoListId))
    }

    // removing Todolist
    function removeTodoList(todoListId: string) {
        const action = RemoveTodolistAC(todoListId)
        dispatchTodolist(action)
        dispatchToTask(action)
    }

// add Todolist
    function addTodoList(title: string) {
        const action = AddTodolistAC(title)
        dispatchTodolist(action)
        dispatchToTask(action)
    }

// change Title for todolist
    function changeTodoListTitle(todoListID: string, newTitle: string) {
       dispatchTodolist(ChangeTodolistTitleAC(todoListID, newTitle))
    }

// add Task  in todolist
    function addTask(title: string, todoListId: string) {
        dispatchToTask(addTaskAC(title, todoListId))
    }

// change filter value
    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchTodolist(ChangeTodolisFiltertAC(todoListId, value))
    }

// change task status
    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        dispatchToTask(changeTaskStatusAC(id, isDone, todoListId))
    }

    // change task title
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        dispatchToTask(changeTaskTitleAC(id, newTitle, todoListId))
    }


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
                        let allTodolistTasks = tasksObj[tl.id];
                        let tasksForTodolist = allTodolistTasks;

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

export default App;
