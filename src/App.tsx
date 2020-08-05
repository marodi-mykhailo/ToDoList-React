import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}



function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    function removeTask(id: string, todoListId: string) {
        debugger;
        let todoListTasks = tasksObj[todoListId]
        tasksObj[todoListId] = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasksObj});
    }
    function removeTodoList(todoListId:string) {
        setTodoLists(todolists.filter(t => t.id !== todoListId))

        delete tasksObj[todoListId]

        setTasks({...tasksObj})
    }

    function addTodoList(title:string) {
        let newTodoListID = v1()
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        };
        setTodoLists([...todolists, newTodoList])
        setTasks({
            ...tasksObj, [newTodoListID]: []
        })
    }


    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let todoList = todolists.find(tl => tl.id === todoListID);
        if(todoList){
            todoList.title = newTitle
            setTodoLists([...todolists])
        }
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasksObj[todoListId]
        tasksObj[todoListId] = [task, ...todoListTasks]
        setTasks({...tasksObj});
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find(t=>t.id === todoListId);
        if(todolist){
            todolist.filter = value;
            setTodoLists([...todolists])
        }
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasksObj[todoListId]

        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        let todoListTasks = tasksObj[todoListId]

        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }



    let [todolists, setTodoLists] = useState<Array<TodoListType>>(
        [
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

    let [tasksObj, setTasks] = useState<TasksStateType>({
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
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolists.map(tl => {
                let allTodolistTasks = tasksObj[tl.id];
                let tasksForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                }
                return <Todolist
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
                />
            })}

        </div>
    );
}

export default App;
