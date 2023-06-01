import React, { useEffect, useState } from 'react'
import ItemRadar from './ItemRadar'
import { listenRadarUpdates } from '../api/radar.api';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addRadarItem, deleteRadarItem, updateRadar } from '../store/reducers/radar.slice';
import { RootState } from '../store';
import { RadarItem, SingleStockRequestType } from '../types';
import Select from './Select';
import Datalist from './Datalist';
import { CiTrash } from 'react-icons/ci';
import toast from 'react-simple-toasts';
import RadarModal from './RadarModal';


function Radar() {
    const dispatch = useDispatch()
    const radar = useSelector<RootState, RadarItem[]>(state => state.radar)
    const [showRadarModal, setShowRadarModal] = useState(false)

    const toggleRadarModal = () => {
        setShowRadarModal(!showRadarModal)
    }
    useEffect(() => {
        listenRadarUpdates((radarItems) => {
            dispatch(updateRadar(radarItems))
        })
    }, [])

    return (
        <>

            <div className='bg-cinza-400 rounded-3xl py-6 w-full h-auto drop-shadow-lg px-6'>
                <div className='flex w-full justify-center items-center'>
                    <h3 className='text-center text-2xl text-verde-300 pb-4 ml-auto'>RADAR</h3>
                    <AiOutlinePlusCircle size={20} className='mb-3 ml-auto text-verde-300 cursor-pointer hover:text-verde-200' onClick={toggleRadarModal} />
                </div>
                <div className='flex justify-between flex-col lg:flex-row gap-4 items-center overflow-x-auto pb-4 no-scrollbar hover:scrollbar lg:mb-2 lg:hover:mb-0'>
                    {
                        radar.map((item) => (
                            <ItemRadar asset={item} key={item.asset_code} />
                        ))
                    }

                </div>
            </div>
            {showRadarModal &&
                <RadarModal toggle={toggleRadarModal} />
            }
        </>
    )
}

export default Radar
