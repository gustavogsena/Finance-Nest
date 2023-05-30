import React from 'react'

type TextfieldType = {
    id: string,
    label?: string,
    labelStyle?: string,
    type: string,
    funcaoOnChange: (arg: any) => void,
    value: any,
    classStyle?: string,
    required?: boolean,
    placeholder?: string,
    disabled?: boolean
    step?: number,
    min?: number,

}

const Textfield = ({ id, label, labelStyle, type, funcaoOnChange, value, step, min, classStyle, placeholder = '', required = true, disabled = false }: TextfieldType) => {
    const stepObj = step ? { step: step } : ''
    const minObj = min ? { min: min } : ''
    return (
        <div className="flex flex-col w-full">
            {label &&
                <label
                    className={`block mb-2 text-center ${labelStyle}`}
                    htmlFor={id}>{label}
                </label>}
            <input
                className={`bg-cinza-600 shadow-sm w-full rounded-[10px] text-base p-3 box-border text-verde-600 placeholder-verde-600 placeholder-opacity-100 ${classStyle}`}
                id={id}
                type={type}
                required={required}
                onChange={event => funcaoOnChange(event.target.value)}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                {...stepObj}
                {...minObj}
            />
        </div>
    )
}

export default Textfield;