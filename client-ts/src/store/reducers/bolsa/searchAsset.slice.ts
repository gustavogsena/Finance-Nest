import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { FullStockQuery, FullStockRequestType } from '../../../types';

type searchMarketDataSeriesActionType = {
  code: string,
  query?: FullStockQuery
}

export const searchMarketAsset = createAction<string>('bolsa/searchMarketAsset');
export const searchMarketDataSeries = createAction<searchMarketDataSeriesActionType>('bolsa/searchMarketDataSeries');

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