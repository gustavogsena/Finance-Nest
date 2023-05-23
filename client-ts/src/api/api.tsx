import axios from 'axios';
import { AuthToken } from '../authToken';
import store from '../store';
import { authenticatedUser, userLogout } from '../store/reducers/user.slice';
import toast from 'react-simple-toasts';
import { ErrorToast } from '../components/ErrorToast';

const texts = {
    unauthenticatedError: 'Erro de autenticação'
}
const api = axios.create({
    baseURL: 'http://localhost:8080'
})

api.interceptors.request.use(config => {
    const token = AuthToken.get()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        store.dispatch(authenticatedUser(token))
    }
    return config
})


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status: number = error.request.status;
        if (status === 401) {
            toast(texts.unauthenticatedError)
            store.dispatch(userLogout())
        } else if (status === 422) {
            error.response.data.message.forEach((message: string) => {
                toast(message, {
                    render(message) {
                        return <ErrorToast message={message} />;
                    },
                });
            })
        }})

export default api