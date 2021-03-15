import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, CircularProgress, Container, LinearProgress} from '@material-ui/core'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {Login} from "../features/Login/Login";
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import {logOutTC} from "../features/Login/authReduer";
import logo from '../assets/image/logo.png'
import StartPage from "../features/StartPage/StartPage";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [dispatch])

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
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                    {isLoggedIn ||
                    <Button color="inherit"><NavLink className={'link'} to={'/login'}>Log In</NavLink></Button>}
                </div>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container className={'container'} fixed>
                <Switch>
                    <Route path={'/startPage'} render={() => <StartPage/>}/>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404 Page not found</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    )
}

export default App;
