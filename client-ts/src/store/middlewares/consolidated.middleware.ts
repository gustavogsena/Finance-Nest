import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getConsolidatedAsset, updateConsolidatedAssets } from "../reducers/consolidated.slice";

import { getConsolidatedAssetsApi } from "../../api/assets.api";

export const consolidatedListener = createListenerMiddleware();

consolidatedListener.startListening({
    actionCreator: getConsolidatedAsset,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        
        const assetsConsolidated = fork(async api => {
            return await getConsolidatedAssetsApi();
        });

        const response = await assetsConsolidated.result
        if (response.status === 'ok') {
            dispatch(updateConsolidatedAssets(response.value))
        }
    }
});