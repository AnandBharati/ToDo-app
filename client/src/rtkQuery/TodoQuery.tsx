import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { todoStateObj } from '../store/todo.reducer.type'
import { loginReturnType, loginType, signupReturnType, signupType } from './Auth.model';

//http://localhost:2000
export const ToDosApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://turquoise-dibbler-belt.cyclic.app" }),
    tagTypes: ['todos'],
    endpoints: (builder) => ({
        getTodos: builder.query<todoStateObj[], string>({
            query: (_id) => `/todo/${_id}`,
            providesTags: ['todos']
        }),
        postTodo: builder.mutation<todoStateObj, todoStateObj>({
            query: (body) => ({
                url: `/todo/new`,
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['todos']
        }),
        deleteTodo: builder.mutation<void, string>({
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['todos']
        }),
        completeTodo: builder.mutation<void, { id: string, value: boolean }>({
            query: ({ id, value }) => ({
                url: `/todo/${id}/${value}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['todos']
        }),

        /*Authentications*/
        register: builder.mutation<signupReturnType, signupType>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),
        login: builder.mutation<loginReturnType, loginType>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            })
        })
    })
})

// eslint-disable-next-line react-refresh/only-export-components
export const { useGetTodosQuery,
    usePostTodoMutation,
    useDeleteTodoMutation,
    useCompleteTodoMutation,
    useRegisterMutation,
    useLoginMutation } = ToDosApi;