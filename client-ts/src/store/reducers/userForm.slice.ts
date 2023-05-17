import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PostEarning, UserForm } from '../../types';

const initialState: UserForm = {
    "name": "",
    "surname": "",
    "email": "",
    "password": ""
}

const userFormSlice = createSlice({
    name: 'userForm',
    initialState,
    reducers: {
        updateUserForm: (state, action: PayloadAction<Partial<UserForm>>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        resetUserForm: () => initialState
    }
});

export const { updateUserForm, resetUserForm } = userFormSlice.actions;

export default userFormSlice.reducer;