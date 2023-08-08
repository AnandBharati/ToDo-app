import { Link } from 'react-router-dom'
import { useRegisterMutation } from '../rtkQuery/TodoQuery'
import './SignUp.css'
import { ChangeEvent, useState } from 'react'

type inputType = {
    username: string
    email: string
    password: string
    cnfm_password: string
}

function SignUp() {

    const [registerUser, { isLoading }] = useRegisterMutation()

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
        registerUser(values);
    }

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