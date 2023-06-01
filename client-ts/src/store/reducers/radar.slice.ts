import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { Query, OperationsResponse, PostOperation, EditOperation, RadarItem } from '../../types';

export const getRadarItems = createAction('getRadarItems')
export const deleteRadarItem = createAction<number>('deleteRadarItem')
export const addRadarItem = createAction<string>('addRadarItem')

const initialState: RadarItem[] = []


const radarSlice = createSlice({
    name: 'Radar',
    initialState,
    reducers: {
        updateRadar: (state, action: PayloadAction<RadarItem[]>) => {
            return action.payload
        },
        resetRadar: () => initialState
    }
});

export const { updateRadar, resetRadar } = radarSlice.actions;

export default radarSlice.reducer;