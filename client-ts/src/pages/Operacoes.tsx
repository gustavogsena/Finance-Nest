import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Query } from '../types'
import { getOperations } from '../store/reducers/operations.slice'
import { RootState } from '../store'
import { resetQuery } from '../store/reducers/query.slice'
import StandardContainer from '../components/StandardContainer'
import OperationContainer from '../components/OperationContainer'
import QueryOptions from '../components/QueryOptions'


export default function Operacoes() {
    const dispatch = useDispatch()
    const query = useSelector<RootState, Query>((state) => state.query)

    useLayoutEffect(() => {
        dispatch(resetQuery())
    }, [])

    useEffect(() => {
        dispatch(getOperations(query))
    }, [query])

    return (
        <StandardContainer>
            <QueryOptions title='Operações' orderBy='operation_date' />
            <OperationContainer />
        </StandardContainer>

    )
}
