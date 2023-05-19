import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { BasicAssetSortKeys, ConsolidatedAsset } from '../../types';


export const getConsolidatedAsset = createAction('getConsolidatedAsset')

const initialState: ConsolidatedAsset = {
  realestate: {
    current: 0,
    price: 0,
    discounted_price: 0,
    earnings: 0,
    balance: 0,
    discounted_balance: 0,
    sold_balance: 0,
    total_sold_balance: 0
  },
  stockshare: {
    current: 0,
    price: 0,
    discounted_price: 0,
    earnings: 0,
    balance: 0,
    discounted_balance: 0,
    sold_balance: 0,
    total_sold_balance: 0
  },
  total: {
    current: 0,
    price: 0,
    discounted_price: 0,
    earnings: 0,
    balance: 0,
    discounted_balance: 0,
    sold_balance: 0,
    total_sold_balance: 0
  }
}

const consolidatedSlice = createSlice({
  name: 'Consolidated',
  initialState,
  reducers: {
    updateConsolidatedAssets: (state, action: PayloadAction<ConsolidatedAsset>) => {
      return action.payload
    },
    resetConsolidatedAssets: () => initialState,
  }
});

export const { updateConsolidatedAssets, resetConsolidatedAssets } = consolidatedSlice.actions;

export default consolidatedSlice.reducer;