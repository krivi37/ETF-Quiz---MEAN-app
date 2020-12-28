export interface LoginResponse {
    success: Boolean,
    token: string,
    msg: string,
    user: {
        id: string,
        name: string,
        surname: string,
        username: string,
        type: string
    }
}