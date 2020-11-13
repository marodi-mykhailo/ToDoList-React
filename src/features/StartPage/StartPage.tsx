import React from 'react';
import s from './StartPage.module.css'
import landing from '../../assets/image/todolist.svg'
import todo from '../../assets/image/todo.png'
import {NavLink, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";

const StartPage = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }
    return (
        <section className={s.section}>
            <h1 className={s.h1}>Organize it all with <span>Any.do</span></h1>
            <img className={s.img} src={todo} alt={''}/>

            <NavLink className={s.link} to={'/login'}>
                <button className={s.btn}>
                    Start
                </button>
            </NavLink>
        </section>
    );
};

export default StartPage;
