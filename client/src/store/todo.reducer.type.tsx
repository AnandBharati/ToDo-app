export type todoStateObj = {
    id: string;
    name: string;
    isCompleted: boolean;
}

export type todoInitialState = {
    isLoading: boolean
    isError: boolean
    errMsg: string
    todos: todoStateObj[];
}

export type todoAction = {
    type: string,
    payload: any,
}