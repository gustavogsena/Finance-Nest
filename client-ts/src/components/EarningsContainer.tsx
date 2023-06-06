import React from 'react'
import EarningBar from './EarningBar'
import EarningItem from './EarningItem'
import PaginationArrows from './PaginationArrows'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { EarningResponseType, Query } from '../types'
import { updateQuery } from '../store/reducers/query.slice'

type EarningsContainerType = {
    earnings: EarningResponseType
}

function EarningsContainer() {
    const query = useSelector<RootState, Query>((state) => state.query)
    const earnings = useSelector<RootState, EarningResponseType>(state => state.earnings)
    const dispatch = useDispatch()

    const changeQuery = (newQuery: Partial<Query>) => {
        dispatch(updateQuery(newQuery))
    }

    return (
        <div className=''>
            <div className='flex justify-between flex-col overflow-y-auto overflow-x-auto scrollbar'>
                {
                    earnings.earnings.length > 0 &&
                    <EarningBar />
                }
                {
                    earnings.earnings.length > 0 &&
                    earnings.earnings.map((earning, index) => {
                        return (
                            <EarningItem earning={earning} key={earning.created_at.toLocaleString()} />
                        )

                    })
                }
                {
                    earnings.earnings.length === 0 &&
                    <div className='text-center uppercase text-verde-600 font-bold'>
                        Lista de proventos está vazia
                    </div>
                }

            </div>
            {
                earnings.earnings.length > 0 &&
                <PaginationArrows changeQueryFunction={changeQuery} count={earnings.count} query={query} />
            }
        </div >
    )
}

export default EarningsContainer