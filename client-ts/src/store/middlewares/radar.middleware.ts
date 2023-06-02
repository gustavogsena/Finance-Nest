import { createListenerMiddleware } from "@reduxjs/toolkit";
import { buscaAtivo } from "../../api/bolsa.api";
import { searchMarketAsset, updateSearchAsset } from "../reducers/bolsa/searchAsset.slice";
import { updateOperationForm } from "../reducers/operationForm.slice";
import { addRadarItem, deleteRadarItem, getRadarItems, updateRadar } from "../reducers/radar.slice";
import { createNewRadarItemApi, deleteRadarItemApi, getAllRadarItemsApi } from "../../api/radar.api";
import toast from "react-simple-toasts";
import store from "..";

export const radarListener = createListenerMiddleware();

radarListener.startListening({
    actionCreator: getRadarItems,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const radarItems = fork(async api => {
            const data = await getAllRadarItemsApi();
            return data
        });

        const response = await radarItems.result

        if (response.status === 'ok' && response.value) {
            dispatch(updateRadar(response.value))
        }
    }
});

radarListener.startListening({
    actionCreator: deleteRadarItem,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const radarItems = fork(async api => {
            const data = await deleteRadarItemApi(action.payload);
            return data
        });

        const response = await radarItems.result

        if (response.status === 'ok' && response.value) {
            dispatch(getRadarItems())
            toast('Ativo deletado do radar com sucesso')
        }
    }
});
radarListener.startListening({
    actionCreator: addRadarItem,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        const code = action.payload
        const radarItems = fork(async api => {
            if (code.length === 0 || code.length > 7) {
                toast('Código do ativo inválido')
                return
            }

            if (store.getState().radar.some((item) => item.asset_code === code)) {
                toast('Ativo já adicionado ao radar')
            }

            if (store.getState().radar.length === 10) {
                toast('Você atingiu o número máximo de itens adicionados ao radar (10)')
            }
            const data = await createNewRadarItemApi(code);
            return data
        });

        const response = await radarItems.result

        if (response.status === 'ok' && response.value?.sucess) {
            dispatch(getRadarItems())
            toast('Ativo adicionado ao radar com sucesso')
        }
    }
});
