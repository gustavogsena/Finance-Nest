import React from 'react'
import fiis from '../images/fiis.png'

function ItemRadar() {
    return (
        <div className='drop-shadow-md flex  p-5 min-w-[200px] w-1/3 bg-cinza-500 rounded-xl mx-6 flex-wrap'>
            <div className='flex w-full justify-between'>
                <img src={fiis} alt="Fundos Imobliarios" className='h-[30px] pr-3' />
                <p>BCRI11</p>
                <div className='flex'>
                    <p>23%</p>
                    <p>^</p>
                </div>
            </div>
            <div className='flex justify-between w-full pt-3'>
                <p>Ontem: R$12,50</p>
                <p>Hoje: R$13,50</p>
            </div>
        </div>
    )
}

export default ItemRadar
