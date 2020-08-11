import {FilterValuesType, TodoListType} from "../App";
import { v1 } from "uuid";


export type  RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type  AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type  ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type  ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}


type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes) =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            } ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title}: t)
        case  'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter}: t)
        default:
            throw new Error('I dont understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType =>{
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}

export const AddTodolistAC = (todolistTitle: string) :AddTodolistActionType =>{
    return {
        type: 'ADD-TODOLIST',
        title: todolistTitle
    }
}

export const ChangeTodolistTitleAC = (todolistId: string,todolistTitle:string):ChangeTodolistTitleActionType =>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: todolistTitle
    }
}

export const ChangeTodolisFiltertAC = (todolistId: string, todolistFilter: FilterValuesType):ChangeTodolistFilterActionType =>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: todolistFilter
    }
}
