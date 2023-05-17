import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { FullStockRequestType, SingleStockRequestType } from './types';

export const searchMarketAsset = createAction<string>('bolsa/getMarketStocks');

const initialState: Partial<FullStockRequestType> = {}

const searchAssetSlice = createSlice({
  name: 'searchAsset',
  initialState,
  reducers: {
    updateSearchAsset: (state, action: PayloadAction<FullStockRequestType>) => {
      return action.payload
    },
  }
});

export const { updateSearchAsset } = searchAssetSlice.actions;

export default searchAssetSlice.reducer;