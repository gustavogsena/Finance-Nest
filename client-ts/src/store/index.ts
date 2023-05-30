import { configureStore } from '@reduxjs/toolkit';
import { bolsaListener } from './middlewares/bolsa.middleware';
import bolsaRealStateSlice from './reducers/bolsa/bolsaRealState.slice';
import bolsaStocksSlice from './reducers/bolsa/bolsaStocks.slice';
import { consolidatedListener } from './middlewares/consolidated.middleware';
import consolidatedSlice from './reducers/consolidated.slice';
import operationsSlice from './reducers/operations.slice';
import { operationsListener } from './middlewares/operations.middleware';
import querySlice from './reducers/query.slice';
import assetsSlice from './reducers/assets.slice';
import searchAssetSlice from './reducers/bolsa/searchAsset.slice';
import { searchAssetListener } from './middlewares/searchAsset.middleware';
import userSlice from './reducers/user.slice';
import { userListener } from './middlewares/user.middleware';
import operationFormSlice from './reducers/operationForm.slice';
import { Query } from '../types';
import { assetsListener } from './middlewares/assets.middleware';
import singleAssetSlice from './reducers/singleAsset.slice';
import earningFormSlice from './reducers/earningForm.slice';
import earningsSlice from './reducers/earnings.slice';
import { earningsListener } from './middlewares/earnings.middleware';
import formSlice from './reducers/form.slice';
import userFormSlice from './reducers/userForm.slice';
import chartDataSlice from './reducers/chartData.slice';
import radarSlice from './reducers/radar.slice';
import { radarListener } from './middlewares/radar.middleware';

const store = configureStore({
  reducer: {
    consolidatedAssets: consolidatedSlice,
    operations: operationsSlice,
    bolsaStock: bolsaStocksSlice,
    bolsaRealState: bolsaRealStateSlice,
    query: querySlice,
    assets: assetsSlice,
    singleAsset: singleAssetSlice,
    earnings: earningsSlice,
    form: formSlice,
    operationForm: operationFormSlice,
    earningForm: earningFormSlice,
    searchAsset: searchAssetSlice,
    user: userSlice,
    userForm: userFormSlice,
    chartData: chartDataSlice,
    radar: radarSlice
  },
  middleware:
    getDefaultMiddleware =>
      getDefaultMiddleware().prepend(
        bolsaListener.middleware,
        assetsListener.middleware,
        consolidatedListener.middleware,
        operationsListener.middleware,
        searchAssetListener.middleware,
        userListener.middleware,
        earningsListener.middleware,
        radarListener.middleware
      )
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;


export const getQuery = () => {
  const query: Query = store.getState().query
  return query
}