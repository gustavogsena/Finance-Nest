import React, { forwardRef } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type SelectType = {
    options: (string | number)[][],
    funcaoOnChange: (arg: any) => void,
    value: any,
    defaultOption?: string
    classStyle?: string,
    id?: string,
    disabled?: boolean,
    required?: boolean
}

const Select = ({ options, id, classStyle, value, disabled, funcaoOnChange, required = true, defaultOption = "Selecione" }: SelectType) => {

    return (
        <div className='flex flex-col w-full'>
            <select
                className={`shadow-lg w-full rounded-lg text-base p-3 box-border text-black ${classStyle}`}
                id={id}
                onChange={event => funcaoOnChange(event.target.value)}
                value={value}
                disabled={disabled}
                required={required}
            >
                <option value='' disabled >{defaultOption} </option>
                {options.map(([itemName, itemValue]) => <option value={itemValue} key={itemName}>{itemName}</option>)}
            </select>
        </div>
    )
}

export default Select