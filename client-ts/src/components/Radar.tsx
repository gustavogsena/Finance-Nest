import React, { useEffect, useState } from 'react'
import ItemRadar from './ItemRadar'
import { listenRadarUpdates } from '../api/radar.api';
import { useDispatch, useSelector } from 'react-redux';
import { updateRadar } from '../store/reducers/radar.slice';
import { RootState } from '../store';
import { RadarItem } from '../types';


function Radar() {
    const radar = useSelector<RootState, RadarItem[]>(state => state.radar)
    const dispatch = useDispatch()


    useEffect(() => {
        listenRadarUpdates((radarItems) => {
            dispatch(updateRadar(radarItems))
        })
    }, [])

    return (
        <div className='bg-cinza-400 rounded-3xl py-6 w-full h-auto drop-shadow-lg px-6 mb-8'>
            <h3 className='text-center text-2xl text-verde-300 pb-4'>Radar</h3>
            <div className='flex justify-between flex-col lg:flex-row gap-4 items-center'>
                {
                    radar.map((item) => (
                        <ItemRadar asset={item} key={item.asset_code}/>
                    ))
                }

            </div>
        </div>
    )
}

export default Radar
