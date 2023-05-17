import { LoginInput, LoginOutput, User, UserForm } from "../../types"
import api from "../api"

export const login = async ({ email, password }: LoginInput): Promise<LoginOutput> => {
    const response = await api.post(`/auth/login`, {
        email,
        password
    })
    return response.data
}

export const getUserApi = async (): Promise<User> => {
    const response = await api.get('/user')
    return response.data
}

export const createUserApi = async (newUser: UserForm): Promise<User> => {
    const response = await api.post('/auth/create', newUser)
    return response.data
}