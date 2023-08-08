export type signupType = {
    username: string
    email: string
    password: string
}

export type signupReturnType = {
    _id: string
    username: string
    email: string
    password: string
}

export type loginReturnType = {
    success : boolean
    username: string
    email: string
}

export type loginType = {
    username: string
    password: string
}