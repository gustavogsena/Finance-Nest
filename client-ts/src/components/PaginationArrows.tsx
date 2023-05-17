import React from 'react'
import { Query } from '../types'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'

type PaginationArrows = {
    query: Query,
    changeQueryFunction: (obj: Partial<Query>) => void,
    count: number
}

function PaginationArrows({query, changeQueryFunction, count = 0 } : PaginationArrows) {
    return (
        <div className='flex justify-center pb-4'>
            <button
                disabled={query.offset > 0 ? false : true}
                className='cursor-pointer disabled:text-gray-500 mr-2'
                onClick={() => changeQueryFunction({ offset: query.offset - query.limit })}>
                <BiLeftArrow />
            </button>
            <span>
                {query.offset + query.limit > count ? count : query.offset + query.limit}/{count}
            </span>
            <button
                disabled={query.offset + query.limit < count ? false : true}
                className='cursor-pointer disabled:text-gray-500 ml-2'
                onClick={() => changeQueryFunction({ offset: query.offset + query.limit })}>
                <BiRightArrow />
            </button>
        </div>
    )
}

export default PaginationArrows
