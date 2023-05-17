import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { Query, EarningResponseType, PostEarning, PartialPostEarning } from '../../types';

export const getEarnings = createAction<Query>('getEarnings')
export const deleteEarning = createAction<number>('deleteEarnings')
export const postEarning = createAction<PostEarning>('postEarning')
export const putEarning = createAction<PostEarning>('putEarning')
export const getEarningsByMonth = createAction<Query>('getEarningsByMonth')


const initialState: EarningResponseType = {
  earnings: [],
  count: 0
}

const earningSlice = createSlice({
  name: 'Earning',
  initialState,
  reducers: {
    updateEarnings: (state, action: PayloadAction<EarningResponseType>) => {
      return action.payload
    },
    resetEarnings: () => initialState
  }
});

export const { updateEarnings, resetEarnings } = earningSlice.actions;

export default earningSlice.reducer;