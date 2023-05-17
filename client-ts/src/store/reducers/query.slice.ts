import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Query } from '../../types';

const initialState: Query = {
  direction: 'desc',
  orderBy: 'created_at',
  search: '',
  type: undefined,
  limit: 10,
  offset: 0,
  assetId: undefined
}

const querySlice = createSlice({
  name: 'Query',
  initialState,
  reducers: {
    updateQuery: (state, action: PayloadAction<Partial<Query>>) => {

      if (action.payload.search) {
        action.payload.offset = 0

        /* Switch case para o search adequando aos valores esperados no back-end */

        switch (action.payload.search.toLowerCase()) {
          case "compra": action.payload.search = 'bought'
            break;
          case "venda": action.payload.search = 'sold'
            break;
          case "acoes": action.payload.search = 'stockshare'
            break;
          case "fundos": action.payload.search = 'realestate'
            break;
          case "fundos imobiliarios": action.payload.search = 'realestate'
            break;
          default: action.payload.search = action.payload.search
        }
      }

      if (action.payload.type === '') action.payload.type = undefined
      /* Caso a action estiver mudando o tipo da query, o offset será setado para 0 */

      if (action.payload.type) {
        if (action.payload.type !== state.type) action.payload.offset = 0
      }

      const newState = {
        ...state,
        ...action.payload,
      }
      return newState
    },

    resetQuery: () => initialState
  }
});

export const { updateQuery, resetQuery } = querySlice.actions;

export default querySlice.reducer;