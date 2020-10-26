import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            return {...state,
            [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)};
        }
        case 'ADD-TASK': {
            debugger
            return {...state,
            [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            };
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) => (
    {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
)
export const addTaskAC = (task: TaskType) => (
    {type: 'ADD-TASK', task} as const
)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => (
    {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => (
    {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => (
    {type: 'SET-TASKS', tasks, todolistId} as const
)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            debugger
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        todolistsAPI.updateTask(todolistId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }).then(() => {
            const action = changeTaskStatusAC(taskId, status, todolistId)
            dispatch(action)
        })
    }
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId)
    if (task) {
        todolistsAPI.updateTask(todolistId, taskId, {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        })
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(taskId, title, todolistId))
                }
            })
    }

}

// types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

