import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Query } from '../types'
import { updateQuery } from '../store/reducers/query.slice'
import Textfield from './Textfield'
import { RootState } from '../store'
import Select from './Select'

type QueryOptionsType = {
    title: string,
    orderBy?: string
}


function QueryOptions({ title, orderBy = 'created_at' }: QueryOptionsType) {
    const query = useSelector<RootState, Query>(state => state.query)
    const dispatch = useDispatch()

    const directionOptions = [['Mais recentes', 'desc'], ['Mais antigas', 'asc']]
    const tiposDeAtivoOptions = [['Todos', ''], ['Ações', 'stockshare'], ['Fundos Imobiliarios', 'realestate']]

    const setQuery = (data: Partial<Query>) => {
        dispatch(updateQuery(data))
    }

    return (
        <div className='bg-cinza-400 rounded-3xl py-6 mb-8'>
            <h2 className='text-center text-4xl text-verde-300 pb-4'>{title}</h2>

            <div className='flex justify-around gap-6 w-full px-4 text-verde-600 flex-wrap '>

                <div className='flex flex-col w-2/5'>
                    <Select
                        defaultOption='Ordenar'
                        options={directionOptions}
                        value={query.direction}
                        funcaoOnChange={value => setQuery({ direction: value, orderBy: orderBy })}
                    />


                </div>

                <div className='flex flex-col w-2/5'>
                    <Select
                        defaultOption='Classe de ativo'
                        options={tiposDeAtivoOptions}
                        value={query.type}
                        funcaoOnChange={value => setQuery({ type: value })}
                    />
                </div>
                <div className='flex flex-col w-1/2'>
                    <Textfield
                        id='search'
                        type='text'
                        placeholder='Buscar'
                        funcaoOnChange={value => setQuery({ search: value })}
                        value={query.search}
                    />
                </div>
            </div>
        </div >
    )
}

export default QueryOptions