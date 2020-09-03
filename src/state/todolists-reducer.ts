import {FilterValuesType, TodoListType} from "../App";
import { v1 } from "uuid";


export type  RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type  AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type  ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}
export type  ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    filter: FilterValuesType
}


type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes): Array<TodoListType> =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            } ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title}: t)
        case  'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter}: t)
        default:
            throw new Error('I dont understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType =>{
    return {
        type: 'REMOVE-TODOLIST',
        todolistId
    }
}

export const AddTodolistAC = (todolistTitle: string) :AddTodolistActionType =>{
    return {
        type: 'ADD-TODOLIST',
        title: todolistTitle,
        todolistId: v1()
    }
}

export const ChangeTodolistTitleAC = (todolistId: string, todolistTitle:string):ChangeTodolistTitleActionType =>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title: todolistTitle
    }
}

export const ChangeTodolisFiltertAC = (todolistId: string, todolistFilter: FilterValuesType):ChangeTodolistFilterActionType =>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filter: todolistFilter
    }
}
