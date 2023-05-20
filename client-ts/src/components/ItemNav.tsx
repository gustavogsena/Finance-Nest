import React from 'react'
import { Link } from 'react-router-dom'

interface ItemNavInterface {
    image: string,
    title: string,
    to: string,
    show: boolean
}

export default function ItemNav({ image, title, to, show }: ItemNavInterface) {
    return (
        <Link to={to} className='flex items-center my-5'>
            <img src={image} alt="Fundos Imobliarios" className={`h-[50px] w-[50px] mx-auto xl:mx-0 xl:mr-3 ${!show ? 'xl:mx-auto xl:mr-auto'  : ''}`} />
            {show ? <p className='text-xl hidden xl:block'>{title}</p> : ''}
        </Link>
    )
}
