import React, {useRef} from 'react';
import s from './StartPage.module.css'
import todo from '../../assets/image/todo.png'
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {initTodolistAC, setTodolistsAC, TodolistDomainType} from "../TodolistsList/todolists-reducer";
import {TaskStatuses, TaskType, TodolistTypeExtended} from "../../api/todolists-api";
import {initTasksAC} from "../TodolistsList/tasks-reducer";


const StartPage = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType> | null>(state => state.todolists)
    const dispatch = useDispatch()

    const onCreateHandle = () => dispatch(initTodolistAC())

    const fileInputRef = useRef<HTMLInputElement>(null);

    const verifyTodoListsArray = (data: any): data is TodolistTypeExtended => {
        if (!Array.isArray(data)) {
            return false;
        }

        return data.every((list) => {
            // Basic structure checks for TodoList
            if (!('id' in list && 'title' in list && 'tasks' in list && 'filter' in list && Array.isArray(list.tasks))) {
                return false;
            }

            // Allow tasks to be an empty array
            if (list.tasks.length === 0) {
                return true;
            }

            // Check each task in the list
            return list.tasks.every((task: TaskType) => {
                // id and todoListId must be non-empty strings
                if (typeof task.id !== 'string' || task.id === '' || typeof task.todoListId !== 'string' || task.todoListId === '') {
                    return false;
                }

                // Other properties can be empty strings, but they must exist
                const hasMandatoryProperties = 'title' in task && 'status' in task && 'order' in task && 'addedDate' in task;
                const statusAndPriorityValid = 'status' in task && Object.values(TaskStatuses).includes(task.status)

                return hasMandatoryProperties && statusAndPriorityValid;
            });
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (!file) {
            alert('No file selected');
            return;
        }

        // FileReader to read the file content
        const reader = new FileReader();
        reader.onload = async (event: ProgressEvent<FileReader>) => {
            if (event.target?.result) {
                try {
                    const json = JSON.parse(event.target.result as string) as {
                        'todolists': Array<TodolistTypeExtended>
                    };

                    if (verifyTodoListsArray(json.todolists)) {
                        const output: {
                            todolists: TodolistDomainType[],
                            tasks: { [todolistId: string]: TaskType[] }
                        } = {todolists: [], tasks: {}};

                        json.todolists.forEach((todolist) => {
                            const {tasks, ...todolistWithoutTasks} = todolist;
                            output.todolists.push(todolistWithoutTasks);

                            if (!output.tasks[todolist.id]) {
                                output.tasks[todolist.id] = [];
                            }
                            output.tasks[todolist.id].push(...tasks);
                        });


                        dispatch(setTodolistsAC(output.todolists))
                        dispatch(initTasksAC(output.tasks))

                    } else {
                        console.error('JSON does not match the TodoList structure');
                        alert('JSON does not match the TodoList structure');
                    }


                    // Optionally, process or upload the JSON data here
                    // For example, call uploadFileToServer(json) if you're uploading the parsed content
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Error parsing JSON file');
                }
            }
        };
        reader.readAsText(file);
    };
    const handleButtonClick = () => {
        fileInputRef.current?.click(); // Programmatically click the hidden file input
    };


    if (Array.isArray(todolists)) {
        return <Redirect to={'/'}/>

    }


    return (
        <section className={s.section}>
            <h1 className={s.h1}>Organize it all with <span>Any.do</span></h1>
            <img className={s.img} src={todo} alt={''}/>
            <div className={s.btnWrapper}>


                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{display: 'none'}} // Hide the file input
                />

                <button className={s.btn} onClick={handleButtonClick}>
                    Load TodoList JSON
                </button>

                <button className={s.btn} onClick={onCreateHandle}>
                    Create new TodoList
                </button>
            </div>
        </section>
    );
};

export default StartPage;
