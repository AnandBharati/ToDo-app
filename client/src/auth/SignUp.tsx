import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../rtkQuery/TodoQuery'
import './SignUp.css'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type inputType = {
    username: string
    email: string
    password: string
    cnfm_password: string
}

function SignUp() {
    const navigate = useNavigate()

    const [registerUser, { isLoading, isSuccess, isError }] = useRegisterMutation()

    const [values, setValues] = useState<inputType>({
        username: '', email: '', password: '', cnfm_password: ''
    })

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function SubmitForm() {
        if (values.username && values.email && values.password && values.cnfm_password) {
            if (values.password === values.cnfm_password) {
                registerUser(values);
            } else {
                toast.error('confirm password does not match', {
                    position: 'bottom-left'
                })
            }
        }
        else {
            toast.error('please enter all the fields', {
                position: 'bottom-left'
            })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('user registered successfully', {
                position: 'bottom-left'
            })
            navigate('/login');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error('error while registering user', {
                position: 'bottom-left'
            });
            setValues({
                username: '', email: '', password: '', cnfm_password: ''
            });
        }
    }, [isError])

    if (isLoading) return <h1 className='h1'> Loading... </h1>

    return (
        <div className="signup__container container vh-100 d-flex flex-column align-items-center justify-content-center">
            <div className="container-fluid bg-white p-5 rounded-3 d-flex flex-column justify-content-center shadow-lg">

                <h1 className='h1 mb-4 align-self-center font-weight-bold'>Sign Up</h1>

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
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="text"
                        className="form-control"
                        placeholder="xyz@gmail.com"
                        value={values.email}
                        onChange={changeHandler}
                        name="email" />
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

                <div className="mb-3 ">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="re-enter password"
                        value={values.cnfm_password}
                        onChange={changeHandler}
                        name="cnfm_password" />
                </div>

                <button className='btn btn-primary mt-2 w-100' onClick={SubmitForm}>Submit</button>
                <button className='btn btn-link mt-2'>
                    <Link to='/login'>
                        Already have an account? Login
                    </Link>
                </button>
            </div>
        </div>

    )
}

export default SignUp