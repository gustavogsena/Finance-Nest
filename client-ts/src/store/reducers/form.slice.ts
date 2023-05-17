import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormStatus } from '../../types';


const initialState: FormStatus = {
    type: 'operation',
    edit: false
}


const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormType: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                type: action.payload
            }
        },
        updateFormEdit: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                edit: action.payload
            }
        },
        resetFormStatus: () => initialState
    }
});

export const { updateFormType, updateFormEdit,  resetFormStatus } = formSlice.actions;

export default formSlice.reducer;