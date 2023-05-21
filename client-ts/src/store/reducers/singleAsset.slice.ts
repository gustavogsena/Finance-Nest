import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { BasicAsset } from '../../types';

const initialState: BasicAsset = {
  "asset_id": 0,
  "asset_code": '',
  "asset_name": '',
  "asset_type": '',
  "created_at": '',
  "user": 0,
  "total_price": 0,
  "total_quantity": 0,
  "average_price": 0,
  "current_price": 0,
  "current_total": 0,
  "balance": 0,
  "balance_with_earnings": 0,
  "discounted_price": 0,
  "discounted_average_price": 0,
  "earnings_received": 0,
  "logourl": ''
}

const singleAssetSlice = createSlice({
  name: 'SingleAsset',
  initialState,
  reducers: {
      updateSingleAsset: (state, action: PayloadAction<BasicAsset>) => {
      return action.payload
    },
    resetSingleAsset: () => initialState
  }
});

export const { updateSingleAsset, resetSingleAsset } = singleAssetSlice.actions;

export default singleAssetSlice.reducer;