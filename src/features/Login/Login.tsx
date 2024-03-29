import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./authReduer";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom"
import s from './Login.module.css'
import welcome from '../../assets/image/welcome.svg';

export const Login = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is Required';
            } else if (values.password.length < 3) {
                errors.password = 'Password must be at least 3 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.wrapp}>
            <div className={s.left}>
                <img src={welcome} alt={''} className={s.img}/>
            </div>
            <div className={s.right}>
                <div className={s.formWrapp}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <p>To log in get registered
                                    <a href={'https://social-network.samuraijs.com/'}
                                       target={'_blank'}
                                       rel="noopener noreferrer"
                                    >here
                                    </a>
                                </p>
                                <p>or use common test account credentials:</p>
                                <p>Email: free@samuraijs.com</p>
                                <p>Password: free</p>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email ?
                                    <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.errors.password ?
                                    <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                                <FormControlLabel
                                    label={'Remember me'}
                                    control={<Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                    />}
                                />
                                <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </div>
            </div>
        </div>
    )


}
