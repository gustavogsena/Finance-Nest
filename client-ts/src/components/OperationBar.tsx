import React from 'react'

function OperationBar() {
    return (
        <div className='bg-verde-300 text-white rounded-3xl py-3 mb-2 w-fit min-w-[100%] h-full drop-shadow-lg px-6 flex justify-between '>
            <span className='w-[calc(100%/7)] min-w-[130px] border-r-2 border-cinza-600'>Data</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>Código</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>Compra/Venda</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>Quantidade</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>Preço Médio</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>Volume</span>
            <span className='w-[calc(100%/14)] min-w-[65px] text-end'>Editar</span>
            <span className='w-[calc(100%/14)] min-w-[65px] text-end'>Excluir</span>
        </div>
    )
}

export default OperationBar