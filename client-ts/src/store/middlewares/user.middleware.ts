import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authenticatedUser, getUser, removeUser, updateUser, userCreate, userLogin, userLogout } from "../reducers/user.slice";
import { createUserApi, getUserApi, login } from "../../api/services/user.api";
import { getConsolidatedAsset, resetConsolidatedAssets } from "../reducers/consolidated.slice";
import { resetQuery, updateQuery } from "../reducers/query.slice";
import { resetOperationForm, updateOperationForm } from "../reducers/operationForm.slice";
import { getAssets } from "../reducers/assets.slice";
import { getEarnings, getEarningsByMonth } from "../reducers/earnings.slice";
import { browserHistory } from "../../browserHistory";
import toast from 'react-simple-toasts';

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
            dispatch(updateUser(response.value))
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
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
            toast('Login realizado com sucesso')
            dispatch(updateUser(response.value.user))
            dispatch(authenticatedUser(response.value.accessToken))
            dispatch(getConsolidatedAsset())
            dispatch(getAssets())
            dispatch(dispatch(getEarnings({ offset: 0, limit: 15 })))
            dispatch(dispatch(getEarningsByMonth({ offset: 0, limit: 15 })))
            browserHistory.push("/")
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
        }
    }
});