import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface ItemNavInterface {
    image: string,
    title: string,
    to: string,
    show: boolean,
    onClick?: () => void
}

export default function ItemNav({ image, title, to, show, onClick }: ItemNavInterface) {
    const [showToltip, setShowToltip] = useState(false)

    return (
        <Link to={to} className='flex items-center my-5 relative' onClick={onClick} onMouseOver={() => setShowToltip(!showToltip)} onMouseLeave={() => setShowToltip(!showToltip)}>
            <img src={image} alt="Fundos Imobliarios" className={`h-[50px] w-[50px] ${!show ? 'mx-auto xl:mr-auto' : 'mx-0 mr-3'}`} />
            {show ? <p className='text-xl '>{title}</p> : ''}
            {showToltip && <div className='absolute bg-black text-white right-[-150px] max-w-[150px]'>
                {title}
            </div>}
        </Link>
    )
}
