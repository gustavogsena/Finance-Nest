import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { LoginInput, User, UserForm } from '../../types';
import { AuthToken } from '../../authToken';
import { browserHistory } from '../../browserHistory';

export const getUser = createAction('getUser')
export const userLogin = createAction<LoginInput>('userLogin')
export const userCreate = createAction<UserForm>('userCreate')
export const userUploadPicture = createAction<File>('userUploadPicture')
export const userLogout = createAction('userLogout')

const initialState: User = {
    isAuthenticated: false,
    userPicture: null
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            return action.payload
        },
        removeUser: (state) => {
            AuthToken.delete()
            browserHistory.push("/login");
            return initialState
        },
        authenticatedUser: (state, action: PayloadAction<string>) => {
            AuthToken.set(action.payload)
            return {
                ...state,
                isAuthenticated: true
            }
        },
        authenticated: (state) => {
            return {
                ...state,
                isAuthenticated: true
            }
        }

    }
});

export const { updateUser, removeUser, authenticatedUser, authenticated } = userSlice.actions;

export default userSlice.reducer;