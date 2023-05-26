import React from 'react'

type InfoContainerItemType = {
    title: string,
    value: number | string,
    boldValue?: string
}

function InfoContainerItem({ title, value, boldValue = '' }: InfoContainerItemType) {
    return (
        <div className='p-3 w-full sm:w-1/2  md:w-1/3'>
            <p className='text-xl font-bold'>{title}</p>
            <p className='text-xl pt-2'>{value} <b>{boldValue}</b></p>
        </div>
    )
}

export default InfoContainerItem