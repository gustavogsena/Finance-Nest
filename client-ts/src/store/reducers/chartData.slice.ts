import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: number[] = []

const chartDataSlice = createSlice({
    name: 'chartData',
    initialState,
    reducers: {
        updateChartData: (state, action: PayloadAction<number[]>) => {
            return action.payload.slice() 
        },
    }
});

export const { updateChartData } = chartDataSlice.actions;

export default chartDataSlice.reducer;