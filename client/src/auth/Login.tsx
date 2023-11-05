import { useDispatch } from 'react-redux'
import useLocalstorage from '../hooks/useLocalstorage'
import { useLoginMutation } from '../rtkQuery/TodoQuery'
import './Login.css'
import { ChangeEvent, useState, useEffect } from 'react'
import { setUser } from '../store/auth.reducer'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

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
                toastId: 'incorrect_cred'
            })
    }

    useEffect(() => {
        data?.success && setLdata(data)
        // console.log('useeffect executed')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    useEffect(() => {
        data?.success && dispatch(setUser(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lData])

    if (isLoading) return <h1 className='h1'> Loading...</h1>
    if (isError) toast.error('please enter correct username and password', {
        position: 'bottom-left',
        toastId: 'login_error'
    })

    return (
        <div className="login__container rounded-lg">
            <div className="p-5 flex flex-col justify-center items-center">
                <h1 className='text-4xl mx-auto mb-6 font-bold'>Login to continue..</h1>
                <div className="mb-3 w-full">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                    <input type="text"
                        className="input w-full mt-2 mb-4 border-2 border-slate-200 form-control focus:border-transparent"
                        placeholder="Username"
                        value={values.username}
                        onChange={changeHandler}
                        name="username" />
                </div>

                <div className="mb-3 w-full">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password"
                        className="input w-full mt-2 mb-4 border-2 border-slate-200 form-control focus:border-transparent"
                        placeholder="enter password"
                        value={values.password}
                        onChange={changeHandler}
                        name="password" />
                </div>

                <button className='btn btn-primary mt-2 w-full' onClick={submitHandler}>Login</button>

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