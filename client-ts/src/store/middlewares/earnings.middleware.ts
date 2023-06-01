import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getConsolidatedAsset } from "../reducers/consolidated.slice";
import { deleteEarning, getEarnings, postEarning, putEarning, updateEarnings } from "../reducers/earnings.slice";
import { deleteEarningApi, getEarningsApi, postEarningsApi, putEarningsApi } from "../../api/earnings.api";
import { Query } from "../../types";
import { getQuery } from "..";
import { getAssets } from "../reducers/assets.slice";
import { resetFormStatus } from "../reducers/form.slice";
import toast from "react-simple-toasts";

export const earningsListener = createListenerMiddleware();

earningsListener.startListening({
    actionCreator: getEarnings,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const query: Query = action.payload;
        const earnings = fork(async api => {
            return await getEarningsApi(query);
        });
        const response = await earnings.result
        if (response.status === 'ok') {
            dispatch(updateEarnings(response.value))
        }
    }
});

earningsListener.startListening({
    actionCreator: deleteEarning,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const earnings = fork(async api => {
            return await deleteEarningApi(action.payload);
        });
        const response = await earnings.result
        if (response.status === 'ok') {
            const query = getQuery()
            toast('Provento deletado com sucesso')
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
            dispatch(getEarnings(query))
        } else {
            toast('Falha ao deletar provento')
        }
    }
});

earningsListener.startListening({
    actionCreator: postEarning,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const earnings = fork(async api => {
            return await postEarningsApi(action.payload);
        });
        const response = await earnings.result
        if (response.status === 'ok') {
            toast('Provento criado com sucesso')
            const query = getQuery()
            dispatch(resetFormStatus())
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
            dispatch(getEarnings(query))
        } else {
            toast('Falha ao criar provento')
        }
    }
});
earningsListener.startListening({
    actionCreator: putEarning,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const earnings = fork(async api => {
            return await putEarningsApi(action.payload);
        });

        const response = await earnings.result
        if (response.status === 'ok') {
            toast('Provento editado com sucesso')
            const query = getQuery()
            dispatch(resetFormStatus())
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
            dispatch(getEarnings(query))
        } else {
            toast('Falha ao editar provento')
        }
    }
});

/* earningsListener.startListening({
    actionCreator: getEarningsByMonth,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const earnings = fork(async api => {
            return await getEarningsByMonthApi(action.payload);
        });

        const response = await earnings.result
        if (response.status === 'ok') {
            dispatch(updateEarningsByMonth(response.value))
        }
    }
}); */