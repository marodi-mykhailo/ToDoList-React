import React, {useEffect, useRef} from 'react'
import './App.css'
import {AppBar, CircularProgress, Container, IconButton, LinearProgress, makeStyles, Tooltip} from '@material-ui/core'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {Redirect, Route, Switch} from 'react-router-dom';
import logo from '../assets/image/logo.png'
import StartPage from "../features/StartPage/StartPage";
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import {setTodolistsAC, TodolistDomainType} from "../features/TodolistsList/todolists-reducer";
import {TaskStatuses, TaskType, TodolistType, TodolistTypeExtended} from "../api/todolists-api";
import {initTasksAC, TasksStateType} from "../features/TodolistsList/tasks-reducer";

type PropsType = {
    demo?: boolean
}

const useStyles = makeStyles(() => ({
    customTooltip: {
        fontSize: "1rem", // Customize the font size here
    }
}));

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistType> | null>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const classes = useStyles()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

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

    const downloadJson = () => {
        if (Array.isArray(todolists)) {
            const assignTasksToTodolists = (todolists: TodolistType[], tasks: TasksStateType): TodolistType[] => {
                return todolists.map(todolist => ({
                    ...todolist,
                    tasks: tasks[todolist.id],
                }));
            }

            const jsonData = assignTasksToTodolists(todolists, tasks)
            // Convert the JSON data to a string
            const jsonString = JSON.stringify({"todolists": jsonData}, null, 2);
            // Create a Blob from the JSON string
            const blob = new Blob([jsonString], {type: 'application/json'});
            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);
            // Create a temporary <a> element and trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'todolist.json'; // The file name for the download
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link); // Clean up
            URL.revokeObjectURL(url); // Free up memory
        }

    };


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <div className={'wrapp'}>
                    <img className={'img'} src={logo} alt={''}/>
                    {
                        Array.isArray(todolists) && <div>
                            <Tooltip title="Upload Todo list JSON" classes={{tooltip: classes.customTooltip}}>
                                <IconButton color={'inherit'} onClick={handleButtonClick}>
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        style={{display: 'none'}} // Hide the file input
                                    />
                                    <PublishIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Dowloand Todo list JSON" classes={{tooltip: classes.customTooltip}}>
                                <IconButton color={'inherit'} onClick={downloadJson}>
                                    <GetAppIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    }

                </div>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container className={'container'} fixed>
                <Switch>
                    <Route path={'/startPage'} render={() => <StartPage/>}/>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/404'} render={() => <h1>404 Page not found</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    )
}

export default App;
