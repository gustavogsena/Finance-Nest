import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { BasicAssetSortKeys } from '../../types';
import { BasicAsset } from '../../types';

export const getAssets = createAction('getAssets')

const initialState: BasicAsset[] = []

const assetsSlice = createSlice({
    name: 'Assets',
    initialState,
    reducers: {

        updateAssets: (state, action: PayloadAction<BasicAsset[]>) => {
            return action.payload
        },

        sortAssetsDesc: (state, action: PayloadAction<keyof BasicAssetSortKeys>) => {
            if (state.length > 1) {
                const sortState = state.slice().sort((a, b) => b[action.payload] - a[action.payload])
                return sortState

            }
            return state
        },
        sortAssetsAsc: (state, action: PayloadAction<keyof BasicAssetSortKeys>) => {
            if (state.length > 1) {
                const sortState = state.slice().sort((a, b) => a[action.payload] - b[action.payload])
                return sortState
            }
            return state

        },
        sortAlphabeticalOrder: (state, action: PayloadAction<boolean>) => {
            if (state.length > 1) {
                const sortState = sortByName(state.slice(), action.payload)
                return sortState
            }
            return state
        }

    }
});


export const { updateAssets, sortAssetsDesc, sortAssetsAsc, sortAlphabeticalOrder } = assetsSlice.actions;

export default assetsSlice.reducer;


const sortByName = (wallet: BasicAsset[], order: boolean) => {
    const sort = wallet.sort((a, b) => {
        if (a.asset_name > b.asset_name) {
            if (order) {
                return 1;
            }
            return -1
        }
        if (a.asset_name < b.asset_name) {
            if (order) {
                return -1;
            }
            return 1
        } else {
            return 0
        }
    })
    return sort
}