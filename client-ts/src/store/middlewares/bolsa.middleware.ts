import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getMarketStocks, getMarketStocksAction } from "../reducers/bolsa/bolsaStocks.slice";
import { getAllRealStates, getAllStocks } from "../../api/services/bolsa.api";
import { getMarketRealStateAction, getMarketRealStates } from "../reducers/bolsa/bolsaRealState.slice";

export const bolsaListener = createListenerMiddleware();

bolsaListener.startListening({
  actionCreator: getMarketStocks,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const stocksData = fork(async api => {
      await api.delay(1000);
      return await getAllStocks();
    });

    const response = await stocksData.result

    if (response.status === 'ok') {
      dispatch(getMarketStocksAction(response.value))
    }
  }
});

bolsaListener.startListening({
  actionCreator: getMarketRealStates,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const stocksData = fork(async api => {
      await api.delay(1000);
      return await getAllRealStates();
    });

    const response = await stocksData.result

    if (response.status === 'ok') {
      dispatch(getMarketRealStateAction(response.value))
    }
  }
});