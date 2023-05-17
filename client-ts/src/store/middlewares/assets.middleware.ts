import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getAssetsApi } from "../../api/services/assets.api";
import { getAssets, sortAssetsDesc, updateAssets } from "../reducers/assets.slice";

export const assetsListener = createListenerMiddleware();

assetsListener.startListening({
    actionCreator: getAssets,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        
        const assetsConsolidated = fork(async api => {
            return await getAssetsApi();
        });

        const response = await assetsConsolidated.result
        if (response.status === 'ok') {
            dispatch(updateAssets(response.value))
            dispatch(sortAssetsDesc("current_total"))
        }
    }
});