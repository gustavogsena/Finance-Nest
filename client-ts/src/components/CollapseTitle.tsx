import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type CollapseTitleType = {
    title: string,
    children: JSX.Element | JSX.Element[]
    initialShow?: boolean,
    className?: string
}

function CollapseTitle({ title, children, className, initialShow = false }: CollapseTitleType) {
    const [show, setShow] = useState(initialShow)
    return (
        <div className={`bg-cinza-400 rounded-3xl px-6 mb-6 ${className}`}>
            <div
                onClick={() => setShow(!show)}
                className='flex relative items-center justify-center p-4'>
                {show ? <IoIosArrowUp className='absolute right-5 text-verde-300' size={25} /> : <IoIosArrowDown className='absolute right-5 text-verde-300' size={25} />}
                <h3 className='text-center text-2xl text-verde-300'>{title}</h3>
            </div>
            {show && <div>
                {children}
            </div>}
        </div>
    )
}

export default CollapseTitle