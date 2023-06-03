import React from 'react'

type SelectType = {
    options: (string | number)[][],
    funcaoOnChange: (arg: any) => void,
    value: any,
    defaultOption?: string
    classStyle?: string,
    id?: string,
    disabled?: boolean,
    required?: boolean,
    placeHolder?: string
}

const Select = ({ options, id, classStyle, value, disabled, funcaoOnChange, placeHolder, required = true, defaultOption = "Selecione" }: SelectType) => {

    return (
        <div className='flex flex-col w-full'>
            <select
                className={`bg-cinza-600 shadow-sm w-full rounded-[10px] text-base p-3 box-border text-verde-600 disabled:bg-cinza-500 placeholder-verde-600 placeholder-opacity-100 ${classStyle}`}
                id={id}
                onChange={event => funcaoOnChange(event.target.value)}
                value={value}
                disabled={disabled}
                required={required}
                placeholder={placeHolder}
            >
                <option value='' disabled >{defaultOption} </option>
                {options.map(([itemName, itemValue]) => <option value={itemValue} key={itemName}>{itemName}</option>)}
            </select>
        </div>
    )
}

export default Select