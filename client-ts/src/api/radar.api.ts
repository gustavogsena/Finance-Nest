
import { CommonResponse, RadarItem } from "../types"
import api from "./api"
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { AuthToken } from "../authToken";
import store from "../store";
import { userLogout } from "../store/reducers/user.slice";
const { AbortController, abortableFetch } = require('abortcontroller-polyfill/dist/cjs-ponyfill');

export const getAllRadarItemsApi = async (): Promise<RadarItem[]> => {
    const response = await api.get(`/radar`)
    return response.data
}

export const createNewRadarItemApi = async (code: string): Promise<CommonResponse<RadarItem>> => {
    const response = await api.post(`/radar/${code}`)
    console.log(response)
    return response.data
}

export const deleteRadarItemApi = async (radarId: number): Promise<CommonResponse<RadarItem>> => {
    const response = await api.delete(`/radar/${radarId}`)
    return response.data
}

export const controller = new AbortController()

export async function listenRadarUpdates(
    onMessage: (data: any) => void
) {
    const token = AuthToken.get();

    await fetchEventSource(
        `${process.env.REACT_APP_API_URL}/radar/sse/notifications`,
        {
            signal: controller.signal,
            onmessage(data) {

                if (data && data.data) {
                    const newRadarItens = JSON.parse(data.data);
                    console.log(newRadarItens)
                    onMessage(newRadarItens);
                }
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
            onerror(err) {
                store.dispatch(userLogout())
                controller.abort()
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




