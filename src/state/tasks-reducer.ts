import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type  removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type  addTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todolistId: string
}

export type  changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type  changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


type ActionsTypes = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

const initialState:TasksStateType = {}

//export type InitialStateType = typeof initialState

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let newTodoList = [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            return {...state, [action.todolistId]: newTodoList}
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.taskTitle, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.todolistId]
            return newState
        default:
           // throw new Error('I dont understand this type')
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {
        type: 'REMOVE-TASK', taskId, todolistId
    }
}

export const addTaskAC = (taskTitle: string, todolistId: string): addTaskActionType => {
    return {
        type: 'ADD-TASK', taskTitle, todolistId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
