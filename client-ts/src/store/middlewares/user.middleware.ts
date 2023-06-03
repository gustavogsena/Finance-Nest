import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authenticated, authenticatedUser, getUser, removeUser, updateUser, userCreate, userLogin, userLogout, userUploadPicture } from "../reducers/user.slice";
import { createUserApi, getUserApi, login, uploadUserPictureApi } from "../../api/user.api";
import { getConsolidatedAsset, resetConsolidatedAssets } from "../reducers/consolidated.slice";
import { resetQuery } from "../reducers/query.slice";
import { resetOperationForm } from "../reducers/operationForm.slice";
import { getAssets } from "../reducers/assets.slice";
import { getEarnings, getEarningsByMonth } from "../reducers/earnings.slice";
import { browserHistory } from "../../browserHistory";
import toast from 'react-simple-toasts';
import { getRadarItems } from "../reducers/radar.slice";
import { controller } from "../../api/radar.api";
import { getMarketRealStates } from "../reducers/bolsa/bolsaRealState.slice";
import { getMarketStocks } from "../reducers/bolsa/bolsaStocks.slice";

export const userListener = createListenerMiddleware();

userListener.startListening({
    actionCreator: getUser,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const confirmUser = fork(async (api) => {
            const user = await getUserApi();
            return user
        });

        const response = await confirmUser.result

        if (response.status === 'ok') {
            (window as any).sse_on = true
            dispatch(updateUser(response.value))
            dispatch(authenticated())
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
            dispatch(getRadarItems())
            dispatch(getMarketRealStates())
            dispatch(getMarketStocks())
            dispatch(dispatch(getEarnings({ offset: 0, limit: 15 })))
            dispatch(dispatch(getEarningsByMonth({ offset: 0, limit: 15 })))
        }
    }
});

userListener.startListening({
    actionCreator: userLogin,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const loginUser = fork(async (api) => {
            const user = await login(action.payload);
            return user
        });

        const response = await loginUser.result
        if (response.status === 'ok') {
            (window as any).sse_on = true
            toast('Login realizado com sucesso')
            dispatch(updateUser(response.value.user))
            dispatch(authenticatedUser(response.value.accessToken))
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
            dispatch(getRadarItems())
            dispatch(getMarketRealStates())
            dispatch(getMarketStocks())
            dispatch(dispatch(getEarnings({ offset: 0, limit: 15 })))
            dispatch(dispatch(getEarningsByMonth({ offset: 0, limit: 15 })))
            browserHistory.push("/")
        } else {
            toast('Falha no login')
        }
    }
});

userListener.startListening({
    actionCreator: userLogout,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        toast('Logout realizado')
        dispatch(resetQuery())
        dispatch(resetConsolidatedAssets())
        dispatch(resetOperationForm())
        dispatch(removeUser())
        controller.abort()
    }
});

userListener.startListening({
    actionCreator: userCreate,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const loginUser = fork(async (api) => {
            const user = await createUserApi(action.payload);
            return user
        });
        const credentials = action.payload

        const response = await loginUser.result
        console.log(response)
        if (response.status === 'ok') {
            toast('Usuario criado com sucesso')
            dispatch(userLogin({ email: credentials.email, password: credentials.password }))
        } else {
            toast('Falha na criação de usuário')
        }
    }
});
userListener.startListening({
    actionCreator: userUploadPicture,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const uploadPicture = fork(async (api) => {
            const user = await uploadUserPictureApi(action.payload);
            return user
        });
        const response = await uploadPicture.result
        console.log(response)
        if (response.status === 'ok') {
            toast('Upload realizado com sucesso')
            dispatch(updateUser(response.value.user))
            dispatch(authenticated())
        } else {
            toast('Falha no upload')
        }
    }
});