import { ChangeEvent } from 'react'
import './rtktodo.css'

type ItemPropsType = {
    id: string
    name: string
    isCompleted: boolean
    removeTodoHandler: (id: string) => void
    completeTodoHandler: (id: string, value: boolean) => void
}

function Item({ id, name, isCompleted, removeTodoHandler, completeTodoHandler }: ItemPropsType) {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked
        completeTodoHandler(id,value);
    }


    return <li
        key={id}
        className={`item input-group mb-2 p-2 d-flex justify-content-between ${isCompleted ? 'completed' : ''}`}
        style={{ width: 'clamp(200px, 100%, 300px)' }}
    >
        <div className="left">
            <input
                className={`form-check-input p-2 m-1`}
                type="checkbox"
                style={{ borderRadius: '4px' }}
                checked={isCompleted}
                onChange={onChangeHandler}
            />
            <span className="">{name}</span>
        </div>

        <div data-bs-theme="dark">
            <button type="button"
                className="btn-close text-white"
                aria-label="Close"
                onClick={() => removeTodoHandler(id)}
            ></button>
        </div>
    </li>
}

export default Item