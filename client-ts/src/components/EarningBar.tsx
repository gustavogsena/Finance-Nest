import React from 'react'

function EarningBar() {
    return (
        <div className='bg-verde-300 text-white rounded-3xl py-3 mb-2 w-fit min-w-[100%] h-full drop-shadow-lg px-6 flex justify-between '>
            <span className='w-1/5 border-r-2 border-cinza-600'>Data</span>
            <span className='w-1/5 text-center'>Código</span>
            <span className='w-1/5 text-center'>Tipo</span>
            <span className='w-1/5 text-center'>Valor</span>
            <span className='w-[10%] text-end'>Editar</span>
            <span className='w-[10%] text-end'>Excluir</span>
        </div>
    )
}
export default EarningBar