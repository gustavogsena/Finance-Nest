import { createListenerMiddleware } from "@reduxjs/toolkit";
import { buscaAtivo } from "../../api/services/bolsa.api";
import { searchMarketAsset, updateSearchAsset } from "../reducers/bolsa/searchAsset.slice";
import { updateOperationForm } from "../reducers/operationForm.slice";

export const searchAssetListener = createListenerMiddleware();

searchAssetListener.startListening({
    actionCreator: searchMarketAsset,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const assetCode = action.payload;
        const assetsConsolidated = fork(async api => {
            const [data] = await buscaAtivo(assetCode); 
            return data
        });

        const response = await assetsConsolidated.result
      
        if (response.status === 'ok' && response.value) {
            dispatch(updateOperationForm({asset: {asset_name: response.value.shortName}}))
            dispatch(updateSearchAsset(response.value))
        }
    }
});