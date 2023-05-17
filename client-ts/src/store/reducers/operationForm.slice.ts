import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { PostOperation, PartialPostOperation, EditOperation } from '../../types';

const initialState: PostOperation = {
  "operation": {
    "quantity": 0,
    "operation_price": 0,
    "operation_type": '',
    "operation_date": ''
  },
  "asset": {
    "asset_code": '',
    "asset_name": "",
    "asset_type": ""
  }
}

const operationFormSlice = createSlice({
  name: 'operationForm',
  initialState,
  reducers: {
    updateOperationForm: (state, action: PayloadAction<Partial<PartialPostOperation>>) => {
      const [key] = Object.keys(action.payload)
      if (key === 'asset' || key === 'operation') {
        let obj = { [key]: { ...state[key], ...action.payload[key] } }

        return {
          ...state,
          ...obj
        }
      }
      return state
    },
    editOperationForm: (state, action: PayloadAction<PostOperation>) => {
      return action.payload
    },
    resetOperationForm: () => initialState
  }
});

export const { updateOperationForm, resetOperationForm, editOperationForm } = operationFormSlice.actions;

export default operationFormSlice.reducer;