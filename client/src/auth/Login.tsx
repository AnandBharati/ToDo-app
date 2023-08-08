import { useDispatch } from 'react-redux'
import useLocalstorage from '../hooks/useLocalstorage'
import { useLoginMutation } from '../rtkQuery/TodoQuery'
import './Login.css'
import { ChangeEvent, useState, useEffect } from 'react'
import { setUser } from '../store/auth.reducer'
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify'

type inputType = {
    username: string
    password: string
}

function Login() {
    //save data localstorage
    const [lData, setLdata] = useLocalstorage('todoAuth'); //22
    //for input 
    const [values, setValues] = useState<inputType>({
        username: '',
        password: ''
    });
    const [login, { isLoading, isSuccess, isError, data }] = useLoginMutation();//1
    const dispatch = useDispatch();

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function submitHandler() {
        if (values.username && values.password)
            login(values);
        else
            toast.error('username or password is not entered', {
                position: 'bottom-left',
                toastId:'incorrect_cred'
            })
    }

    useEffect(() => {
        data?.success && setLdata(data)
        // console.log('useeffect executed')
    }, [isSuccess]);

    useEffect(() => {
        data?.success && dispatch(setUser(data));
    }, [lData])

    // useEffect(() => {
    //     //checking if localstorage is having auth already
    //     lData && console.log('already logged in')
    // }, []);

    if (isLoading) return <h1 className='h1'> Loading...</h1>
    if (isError) toast.error('please enter correct username and password', {
        position: 'bottom-left',
        toastId: 'login_error'
    })

    return (
        <div className="login__container container vh-100 d-flex flex-column align-items-center justify-content-center">
            <div className="container-fluid bg-white p-5 rounded-3 d-flex flex-column justify-content-center shadow-lg">
                <h1 className='h1 mb-4 align-self-center font-weight-bold'>Login</h1>
                <div className="mb-3 ">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Username"
                        value={values.username}
                        onChange={changeHandler}
                        name="username" />
                </div>

                <div className="mb-3 ">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="enter password"
                        value={values.password}
                        onChange={changeHandler}
                        name="password" />
                </div>

                <button className='btn btn-primary mt-2 w-100' onClick={submitHandler}>Login</button>

                <button className='btn btn-link mt-2'>
                    <Link to='/signup'>
                        Create a new account
                    </Link>
                </button>

            </div>
        </div>

    )
}

export default Login;