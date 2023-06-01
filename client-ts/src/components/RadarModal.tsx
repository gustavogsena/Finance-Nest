import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRadarItem, deleteRadarItem } from '../store/reducers/radar.slice';
import { RootState } from '../store';
import Datalist from './Datalist';
import { CiTrash } from 'react-icons/ci';
import { GrFormClose } from 'react-icons/gr';
import { RadarItem } from '../types';

type RadarModalType = {
    toggle: () => void
}

function RadarModal({ toggle }: RadarModalType) {
    const dispatch = useDispatch()
    const radar = useSelector<RootState, RadarItem[]>(state => state.radar)
    const dataOptions = useSelector<RootState, string[]>(state => {
        const stockShare = state.bolsaStock.map((item) => item.stock)
        const realEstate = state.bolsaRealState.map((item) => item.stock)
        return [...stockShare, ...realEstate]
    })

    const [radarCode, setRadarCode] = useState('')


    const deleteItem = (radarId: number) => {
        dispatch(deleteRadarItem(radarId))
    }

    const submitForm = (event: React.FormEvent<HTMLFormElement>, code: string) => {
        event.preventDefault()
        dispatch(addRadarItem(code))
    }

    return (
        <div className='w-screen bg-black bg-opacity-50 h-screen fixed top-0 right-0 z-50 flex justify-center items-center '>
            <div className='w-full h-full absolute z-0' onClick={toggle}>

            </div>
            <div className='max-w-[400px] w-full bg-cinza-400 rounded-2xl p-4 border-gray-600 border-opacity-90 border-4 z-10'>
                <div className='flex w-full justify-center items-center'>
                    <h4 className='text-center text-xl text-verde-300' >Adicionar ao Radar</h4>
                    <GrFormClose size={16} className='mb-3 ml-auto text-verde-300 cursor-pointer hover:text-verde-200' onClick={toggle}/>
                </div>

                <form className='flex flex-col' onSubmit={(event) => submitForm(event, radarCode)}>
                    <Datalist
                        id='asset_list'
                        className='w-4/5 mx-auto'
                        dataOptions={dataOptions}
                        value={radarCode}
                        funcaoOnChange={value => setRadarCode(value)}
                    />
                    <button className='w-4/5 mx-auto p-2 mb-3 rounded-lg bg-verde-300 text-cinza-400'>
                        Adicionar
                    </button>
                </form>

                {
                    radar.map((item) => {
                        return (
                            <div className='flex justify-between px-[10%] mb-2' key={`item_modal_${item.asset_code}`}>
                                <span>
                                    {item.asset_code.toUpperCase()}
                                </span>
                                <span className='w-1/12 text-end text-vermelho-500 cursor-pointer'>
                                    <CiTrash onClick={() => deleteItem(item.radar_id)} />
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RadarModal