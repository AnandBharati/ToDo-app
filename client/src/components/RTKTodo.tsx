import { ChangeEvent, useState, MouseEvent, CSSProperties } from "react";
import { useCompleteTodoMutation, useDeleteTodoMutation, useGetTodosQuery, usePostTodoMutation } from "../rtkQuery/TodoQuery"
import uniqid from 'uniqid';
import { ClipLoader } from 'react-spinners'
import Item from "./Item";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toast } from "react-toastify";


const override: CSSProperties = {
    display: "block",
    margin: '0 auto',
    borderColor: "green",
};


function RTKTodo() {
    const { _id } = useSelector((state: RootState) => state.authReducer);
    const { data, isLoading, isError, isSuccess, isFetching } = useGetTodosQuery(_id);
    const [postTodo, { isLoading: pIsLoading }] = usePostTodoMutation();
    const [removeTodo, { isLoading: dIsLoading }] = useDeleteTodoMutation()
    const [completeTodo, { isLoading: uIsLoading }] = useCompleteTodoMutation()
    const [input, setInput] = useState('');


    if (isLoading || pIsLoading) {
        return <div className="d-flex align-items-center justify-content-center vh-100">
            <ClipLoader
                loading={isLoading || pIsLoading || isFetching || dIsLoading || uIsLoading}
                cssOverride={override}
                color={'#fffff'}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }


    // if (isFetching) return <h1> Fetching...</h1>
    if (isError) return <h1> Error occured </h1>


    function addNewTodoHandler(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (input) {
            const task = {
                id: uniqid(),
                name: input,
                isCompleted: false,
                createdBy: _id,
            };
            postTodo(task);
            setInput('');
        }
        else toast.warn("task cannot be empty", {
            delay: .5,
            // toastId: 'task_empty',
            position: 'bottom-right',
            className: 'bg-neutral text-base-100'
        })
        // refetch();
    }

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    function removeTodoHandler(id: string) {
        removeTodo(id);
    }

    function completeTodoHandler(id: string, value: boolean) {
        completeTodo({ id, value })
    }

    return (
        <div className="todo__container self-start mt-16 w-auto p-4">
            <h1 className="mb-7 text-5xl font-semibold">ToDo App</h1>
            <div className="join input-group mb-7 flex justify-center">
                <input type="text"
                    placeholder="Enter you task here.."
                    className="input m-0 p-3 text-xl border-2 border-slate-200 form-control focus:border-transparent"
                    style={{ border: '2px solid #3333', marginLeft: '0 !important', width: "clamp(300px, 100%, 600px" }}
                    value={input}
                    onChange={changeHandler} />
                <button
                    type="button"
                    className="btn-primary px-5 m-0 text-lg uppercase"
                    onClick={(e) => addNewTodoHandler(e)}>add</button>
            </div>

            <ul>
                {isSuccess && data.map(({ id, name, isCompleted }) => <Item
                    key={id}
                    id={id}
                    name={name}
                    isCompleted={isCompleted}
                    removeTodoHandler={removeTodoHandler}
                    completeTodoHandler={completeTodoHandler}
                />)}
            </ul>
        </div>
    )
}

export default RTKTodo