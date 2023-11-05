import { ChangeEvent } from 'react'
import './rtktodo.css'
import { MdDeleteOutline } from 'react-icons/md'

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
        completeTodoHandler(id, value);
    }


    return <li
        key={id}
        className={`item p-2 flex flex-row justify-between items-center ${isCompleted ? 'completed' : ''}`}
        style={{ width: 'clamp(200px, 100%, 300px)' }}
    >
        <div className="left flex items-center">
            <input
                className={`form-check-input p-2 m-1 checkbox checkbox-info rounded-full`}
                type="checkbox"
                checked={isCompleted}
                onChange={onChangeHandler}
            />
            <span className="ml-2">{name}</span>
        </div>

        <div className="text-xl">
            <button type="button"
                className=" btn-close text-white hover:scale-125"
                aria-label="Close"
                onClick={() => removeTodoHandler(id)}
            >
                <MdDeleteOutline />
            </button>
        </div>
    </li>
}

export default Item