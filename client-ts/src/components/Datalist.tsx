import React, { forwardRef } from 'react'
import { SingleStockRequestType } from '../types'

type DatalistType = {
    id: string,
    funcaoOnChange: (arg: any) => void,
    value: any,
    dataAssetsOptions?: {
        stockshare: SingleStockRequestType[],
        realestate: SingleStockRequestType[]
    },
    dataOptions?: string[],
    watch?: string
    otherProps?: any
    classStyle?: string,
    disabled?: boolean

}

function Datalist({ watch, value, id, classStyle, dataAssetsOptions, dataOptions, funcaoOnChange, disabled = false }: DatalistType) {
    return (
        <div className='flex flex-col w-full'>
            <input
                className={`shadow-lg w-full rounded-lg text-base p-3 box-border my-3 text-black ${classStyle}`}
                list={id}
                onChange={event => funcaoOnChange(event.target.value)}
                value={value}
                disabled={disabled}
            />
            <datalist id={id}>
                {
                    watch === 'stockshare' &&
                    dataAssetsOptions?.stockshare.map((ativo) => <option value={ativo.stock} key={ativo.stock}>
                        {ativo.stock.toUpperCase()}
                    </option>)
                }
                {
                    watch === 'realestate' &&
                    dataAssetsOptions?.realestate.map((ativo) => <option value={ativo.stock} key={ativo.stock}>
                        {ativo.stock.toUpperCase()}
                    </option>)
                }
                {
                    !watch &&
                    dataOptions?.map(string => <option value={string} key={string}>{string}</option>)
                }
            </datalist>
        </div>
    )
}

export default Datalist
