
import { BasicAsset, ConsolidatedAsset, HistoricalDevelopmentDataResponse, RadarItem } from "../types"
import api from "./api"
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { AuthToken } from "../authToken";
import store from "../store";
import { userLogout } from "../store/reducers/user.slice";
const { AbortController, abortableFetch } = require('abortcontroller-polyfill/dist/cjs-ponyfill');

export const getAllRadarItems = async (): Promise<RadarItem[]> => {
    const response = await api.get(`/radar`)
    return response.data
}

export const createNewRadarItem = async (code: string): Promise<ConsolidatedAsset> => {
    const response = await api.post(`/radar/${code}`)
    return response.data
}

export const deleteRadarItem = async (radarId: number): Promise<HistoricalDevelopmentDataResponse[]> => {
    const response = await api.delete(`/radar/${radarId}`)
    return response.data
}


export const controller = new AbortController

export async function listenRadarUpdates(
    onMessage: (data: any) => void
) {
    const token = AuthToken.get();

    await fetchEventSource(
        `http://localhost:8080/radar/sse/notifications`,
        {
            onmessage(data) {
                if (data && data.data) {
                    const newRadarItens = JSON.parse(data.data);
                    console.log(newRadarItens)
                    onMessage(newRadarItens);
                }
            },
            signal: controller.signal as AbortSignal,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            onerror(err) {
                store.dispatch(userLogout())
            },
            onclose() {

            }
        }
    ).catch((err) => {
        if (err.name == 'AbortError') {
            return;
        }
    })


}




