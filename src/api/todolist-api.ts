import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1a3237fe-e721-4f8c-aaca-8ad848347a2d',
        'content-type': 'application/json'
    }
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}


export type TaskType = {
    description: string
    title: string
    status: any
    priority: any
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists',)
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>('todo-lists', {title},)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title},)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`,)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, taskObj: UpdateTaskModelType){
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, taskObj)
    }

}
