import { createListenerMiddleware } from "@reduxjs/toolkit";
import { buscaAtivo } from "../../api/bolsa.api";
import { searchMarketAsset, updateSearchAsset } from "../reducers/bolsa/searchAsset.slice";
import { updateOperationForm } from "../reducers/operationForm.slice";
import { getRadarItems, updateRadar } from "../reducers/radar.slice";
import { getAllRadarItems } from "../../api/radar.api";

export const radarListener = createListenerMiddleware();

radarListener.startListening({
    actionCreator: getRadarItems,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const radarItems = fork(async api => {
            const data = await getAllRadarItems();
            return data
        });

        const response = await radarItems.result

        if (response.status === 'ok' && response.value) {
            dispatch(updateRadar(response.value))
        }
    }
});
