import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux/es/exports";
import todoReducer from './todo.reducer';
import authReducer from './auth.reducer';
import { ToDosApi } from "../rtkQuery/TodoQuery";

const reducer = combineReducers({
    todoReducer: todoReducer,
    authReducer: authReducer,
    [ToDosApi.reducerPath]: ToDosApi.reducer,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware:any) => getDefaultMiddleware().concat(ToDosApi.middleware),
    
})

export type RootState = ReturnType<typeof store.getState>

//useAppDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
//useAppSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;