import React from 'react'
import ItemRadar from './ItemRadar'


function Radar() {
    return (
        <div className='bg-cinza-400 rounded-3xl py-6 w-full max-h-[30%] h-full drop-shadow-lg px-6'>
            <h3 className='text-center text-2xl text-verde-300 pb-4'>Radar</h3>
            <div className='flex justify-between'>
                <ItemRadar />
                <ItemRadar />
                <ItemRadar />
            </div>
        </div>
    )
}

export default Radar
