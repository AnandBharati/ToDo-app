import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { todoInitialState, todoStateObj } from "./todo.reducer.type";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: todoInitialState = {
    isLoading: false,
    isError: false,
    errMsg: '',
    todos: []
};

export const fetchTodoList = createAsyncThunk('fetchTodo', async () => {
    const option = {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: "64ce1fb5693025d1c5fb3c53"})
    }
    const res = await fetch('http://127.0.0.1:2000/todo/', option)
    // console.log(await res)
    return await res.json();
})

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<todoStateObj>) => {
            const { isLoading, isError, errMsg } = state;
            return { isLoading, isError, errMsg, todos: [action.payload, ...state.todos] }
        },

        remove: (state, action: PayloadAction<todoStateObj>) => {
            const { isLoading, isError, errMsg } = state;
            const newArr = state.todos.filter((item) => item.id !== action.payload.id)
            return { isLoading, isError, errMsg, todos: newArr }
        },

        update: (state, action: PayloadAction<todoStateObj>) => {
            const { isLoading, isError, errMsg } = state;
            const newArr = state.todos.map((item) => item.id == action.payload.id ? action.payload : item);
            return { isLoading, isError, errMsg, todos: newArr }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchTodoList.pending, (state) => {
            return { ...state, isLoading: true }
        })
        builder.addCase(fetchTodoList.fulfilled, (state, { payload }) => {
            console.log(payload)
            const newArr = payload.map((todo: any) => ({ id: todo.id, name: todo.name, isCompleted: todo.isCompleted }))
            return { ...state, isLoading: false, todos: newArr }
        })
        builder.addCase(fetchTodoList.rejected, (state, { payload }) => {
            console.log(payload)
            return { ...state, isLoading: false}
        })
    },
})

export default todoSlice.reducer;
export const { add, remove, update } = todoSlice.actions;