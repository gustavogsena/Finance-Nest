import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { SingleStockRequestType } from './types';

export const getMarketRealStates = createAction('bolsa/getMarketRealStates');

const initialState: Array<SingleStockRequestType> = []

const bolsaRealStateSlice = createSlice({
  name: 'BolsaRealState',
  initialState,
  reducers: {
    getMarketRealStateAction: (state, action: PayloadAction<SingleStockRequestType[]>) => {
      return action.payload
    }
  }
});

export const { getMarketRealStateAction } = bolsaRealStateSlice.actions;

export default bolsaRealStateSlice.reducer;