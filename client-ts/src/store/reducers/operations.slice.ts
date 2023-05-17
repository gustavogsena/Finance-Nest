import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { Query, OperationsResponse, PostOperation, EditOperation } from '../../types';

export const getOperations = createAction<Query>('getOperations')
export const deleteOperation = createAction<number>('deleteOperation')
export const postOperation = createAction<PostOperation>('postOperation')
export const putOperation = createAction<EditOperation>('putOperation')


const initialState: OperationsResponse = {
  operations: [],
  count: 0,
}

const operationsSlice = createSlice({
  name: 'Operations',
  initialState,
  reducers: {
    updateOperations: (state, action: PayloadAction<OperationsResponse>) => {
      return action.payload
    },
    resetOperations: () => initialState
  }
});

export const { updateOperations, resetOperations } = operationsSlice.actions;

export default operationsSlice.reducer;