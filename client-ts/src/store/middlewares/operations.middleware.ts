import { createListenerMiddleware } from "@reduxjs/toolkit";
import { deleteOperation, getOperations, postOperation, putOperation, updateOperations } from "../reducers/operations.slice";
import { deleteOperationApi, getOperationsApi, postOperationApi, putOperationApi } from "../../api/operations.api";

import { getConsolidatedAsset } from "../reducers/consolidated.slice";
import { getQuery } from "..";
import { resetOperationForm } from "../reducers/operationForm.slice";
import { getAssets } from "../reducers/assets.slice";
import { Query } from "../../types";
import { getEarnings } from "../reducers/earnings.slice";
import toast from "react-simple-toasts";


export const operationsListener = createListenerMiddleware();

operationsListener.startListening({
    actionCreator: getOperations,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const operationQuery: Query = action.payload;
        const assetsConsolidated = fork(async api => {
            return await getOperationsApi(operationQuery);
        });

        const response = await assetsConsolidated.result
        if (response.status === 'ok') {
            dispatch(updateOperations(response.value))
        }
    }
});

operationsListener.startListening({
    actionCreator: postOperation,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const operation = action.payload;
        const post = fork(async api => {
            return await postOperationApi(operation);
        });

        const response = await post.result
        if (response.status === 'ok') {
            toast('Operação criada com sucesso')
            dispatch(resetOperationForm())
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
        } else {
            toast('Falha ao criar operação')
        }
    }
});

operationsListener.startListening({
    actionCreator: putOperation,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const operation = action.payload;
        const post = fork(async api => {
            return await putOperationApi(operation);
        });

        const response = await post.result
        if (response.status === 'ok') {
            toast('Operação editada com sucesso')
            dispatch(resetOperationForm())
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
        } else {
            toast('Falha ao editar operação')
        }
    }
});

operationsListener.startListening({
    actionCreator: deleteOperation,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const operationId = action.payload;
        const post = fork(async api => {
            return await deleteOperationApi(operationId);
        });

        const response = await post.result
        if (response.status === 'ok') {
            const query = getQuery()
            toast('Operação deletada com sucesso')
            dispatch(getOperations(query))
            dispatch(getEarnings(query))
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
        } else {
            toast('Falha ao deletar operação')
        }
    }
});