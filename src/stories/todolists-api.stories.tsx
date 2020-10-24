import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const createTodo = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data.data.item)
            })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'Input Tod0listId...'} value={title} onChange={onChangeHandler}/>
        <button onClick={createTodo}>Create Todo</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const deleteTodolistHandler = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'Input Tod0listId...'} value={todolistId} onChange={onChangeHandler}/>
        <button onClick={deleteTodolistHandler}>Delete Todolist</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("")

    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const updateTodoTitle = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
                setTitle('')
                setTodolistId('')
            })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'Input Tod0listId...'} value={todolistId} onChange={onChangeTodoIdHandler}/>
        <input placeholder={'Input Title...'} value={title} onChange={onChangeTitleHandler}/>
        <button onClick={updateTodoTitle}>Delete Todolist</button>
    </div>
}

export const getTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")

    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const getTasksBtn = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
    }


    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'Input Tod0listId...'} value={todolistId} onChange={onChangeTodoIdHandler}/>
        <button onClick={getTasksBtn}>Get Tasks</button>
    </div>

}

export const createTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [TaskTitle, setTaskTitle] = useState("")

    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const updateTodoTitle = () => {
        todolistAPI.createTask(todolistId, TaskTitle)
            .then((res) => {
                setState(res.data)
                setTaskTitle('')
                setTodolistId('')
            })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'Input Tod0listId...'} value={todolistId} onChange={onChangeTodoIdHandler}/>
        <input placeholder={'Input Title...'} value={TaskTitle} onChange={onChangeTitleHandler}/>
        <button onClick={updateTodoTitle}>Create Task</button>
    </div>
}

export const deleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")

    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const updateTodoTitle = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
                setTodolistId('')
                setTaskId('')
            })
    }
    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={'Input Tod0listId...'} value={todolistId} onChange={onChangeTodoIdHandler}/>
        <input placeholder={'Input Title...'} value={taskId} onChange={onChangeTaskIdHandler}/>
        <button onClick={updateTodoTitle}>Create Task</button>
    </div>
}

export const updateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")


    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }


    useEffect(() => {

        const taskObj = {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline
        }
        todolistAPI.updateTask(todolistId, taskId, taskObj)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value) }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value) }}/>
            <input placeholder={'Task Title'} value={title} onChange={(e) => { setTitle(e.currentTarget.value)}}/>
            <input placeholder={'Description'} value={description} onChange={(e) => { setDescription(e.currentTarget.value)}}/>
            <input placeholder={'status'} value={status} type="number" onChange={(e) => { setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'priority'} value={priority} type="number" onChange={(e) => { setPriority(+e.currentTarget.value)}}/>
            <button onClick={createTask}>update task</button>
        </div>
    </div>
}


