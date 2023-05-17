import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { SingleStockRequestType } from './types';

export const getMarketStocks = createAction('bolsa/getMarketStocks');

const initialState: Array<SingleStockRequestType> = []

const bolsaStocksSlice = createSlice({
  name: 'BolsaStocks',
  initialState,
  reducers: {
    getMarketStocksAction: (state, action: PayloadAction<SingleStockRequestType[]>) => {
      return action.payload
    },
  }
});

export const { getMarketStocksAction } = bolsaStocksSlice.actions;

export default bolsaStocksSlice.reducer;