import React, { useEffect, useRef } from 'react'
import OperationBar from './OperationBar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { OperationsResponse, Query } from '../types'
import { resetQuery, updateQuery } from '../store/reducers/query.slice'
import { getOperations } from '../store/reducers/operations.slice'
import PaginationArrows from './PaginationArrows'
import OperationItem from './OperationItem'

function OperationContainer() {
    const dispatch = useDispatch()
    const operations = useSelector<RootState, OperationsResponse>((state) => state.operations)
    const query = useSelector<RootState, Query>((state) => state.query)
    const firstUpdate = useRef(true)

    const changeQuery = (data: Partial<Query>) => {
        dispatch(updateQuery(data))
    }

    useEffect(() => {
        if (!firstUpdate) {
            dispatch(resetQuery())
        }
        firstUpdate.current = false
    }, [])

    useEffect(() => {
        dispatch(getOperations(query))
    }, [query])
    return (
        <div>
            <div className=''>
                <div className='flex justify-between flex-col  overflow-y-auto'>
                    <OperationBar />
                    {
                        operations.operations.map((operation) => {
                            return (
                                <OperationItem data={operation} key={operation.created_at.toLocaleString()} />
                            )
                        })
                    }
                </div>
                <PaginationArrows changeQueryFunction={changeQuery} count={operations.count} query={query} />
            </div>
        </div >
    )
}

export default OperationContainer