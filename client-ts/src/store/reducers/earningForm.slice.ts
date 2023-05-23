import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PostEarning } from '../../types';

const initialState: PostEarning = {
    "earning": {
        "earning_type": "",
        "earning_date": "",
        "earning_value": 0
    },

    "asset_id": 0
}

const earningFormSlice = createSlice({
    name: 'operationForm',
    initialState,
    reducers: {
        updateEarningForm: (state, action: PayloadAction<Partial<PostEarning>>) => {
            return {
                ...state,
                ...action.payload
            }

        },
        editEarningForm: (state, action: PayloadAction<PostEarning>) => {
            return action.payload
        },
        resetEarningForm: () => initialState
    }
});

export const { updateEarningForm, editEarningForm, resetEarningForm } = earningFormSlice.actions;

export default earningFormSlice.reducer;