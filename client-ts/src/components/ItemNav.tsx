import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

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
        <>
            <Link to={to} className='flex items-center my-5 ' onClick={onClick} onMouseOver={() => setShowToltip(true)} onMouseLeave={() => setShowToltip(false)} data-tooltip-id='nav_toltip' data-tooltip-content={title}>
                <img src={image} alt="Fundos Imobliarios" className={`h-[35px]sm:h-[50px] w-[35px] sm:w-[50px] ${!show ? 'mx-auto xl:mr-auto' : 'mx-0 mr-3'}`} />
                {show ? <p className='text-xl '>{title}</p> : ''}

            </Link>
           
        </>


    )
}
