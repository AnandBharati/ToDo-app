import { ChangeEvent, useState, MouseEvent, CSSProperties } from "react";
import { useCompleteTodoMutation, useDeleteTodoMutation, useGetTodosQuery, usePostTodoMutation } from "../rtkQuery/TodoQuery"
import uniqid from 'uniqid';
import { ClipLoader } from 'react-spinners'
import Item from "./Item";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const override: CSSProperties = {
    display: "block",
    margin: '0 auto',
    borderColor: "red",
};


function RTKTodo() {
    const {_id} = useSelector((state: RootState)=>state.authReducer) ;
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
        const task = {
            id: uniqid(),
            name: input,
            isCompleted: false,
            createdBy: _id,
        };
        postTodo(task);
        setInput('');
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
        <div className="todo__container container">
            <h1 className="display-1 m-5">ToDo App</h1>
            <div className="input-group mb-5">
                <input type="text"
                    className="form-control"
                    style={{ border: '2px solid #3333' }}
                    value={input}
                    onChange={changeHandler} />
                <button
                    type="button"
                    className="btn btn-primary"
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