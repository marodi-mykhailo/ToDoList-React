import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Action, Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {v4 as uuidv4} from 'uuid';

const initialState: Array<TodolistDomainType> | null = null

export const todolistsReducer = (state: Array<TodolistDomainType> | null = initialState, action: ActionsType): Array<TodolistDomainType> | null => {
    switch (action.type) {
        case "INIT-TODOLIST":
            return []
        case 'REMOVE-TODOLIST':
            return state!.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state!]
        case 'CHANGE-TODOLIST-TITLE':
            return state!.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state!.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state!.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: tl.filter || "all", entityStatus: 'idle'}))
        default:
            return state
    }
}

// actions
export const initTodolistAC = () => ({type: 'INIT-TODOLIST'} as const)
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
export const setTodolistsAC = (todolists: Array<TodolistDomainType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
// export const fetchTodolistsTC = () => {
//     return (dispatch: ThunkDispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         todolistsAPI.getTodolists()
//             .then((res) => {
//                 dispatch(setTodolistsAC(res.data))
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(setAppStatusAC('loading'))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string): ThunkAction<void, AppRootStateType, unknown, Action<string>> => {
    return (dispatch: ThunkDispatch, getState) => {
        dispatch(setAppStatusAC('loading'))

        const minOrder = getState().todolists!.reduce((min, current) => {
            return current.order < min ? current.order : min;
        }, getState().todolists![0]?.order);

        dispatch(addTodolistAC({
            title, id: uuidv4(), order: minOrder === undefined ? 0 : minOrder - 1, addedDate: new Date().toISOString()
        }))
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(id, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | ReturnType<typeof initTodolistAC>
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>
