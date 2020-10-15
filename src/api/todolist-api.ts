import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers:{
        'API-KEY': '1a3237fe-e721-4f8c-aaca-8ad848347a2d'
    }
})

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors:Array<string>
    data: T
}




export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists',)
    },
    createTodolist(title: string){
        return instance.post<CommonResponseType<{item: TodolistType}>>('todo-lists', {title},)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`, {title},)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`,)
    }

}
