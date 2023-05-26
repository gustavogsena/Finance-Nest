import React from 'react'
import { Link } from 'react-router-dom'

interface ItemNavInterface {
    image: string,
    title: string,
    to: string,
    show: boolean,
    onClick?: () => void
}

export default function ItemNav({ image, title, to, show, onClick }: ItemNavInterface) {
    return (
        <Link to={to} className='flex items-center my-5 ' onClick={onClick}>
            <img src={image} alt="Fundos Imobliarios" className={`h-[50px] w-[50px] mx-auto ${!show ? 'xl:mx-auto xl:mr-auto'  : 'mx-0 mr-3'}`} />
            {show ? <p className='text-xl '>{title}</p> : ''}
        </Link>
    )
}
