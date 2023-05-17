import React from 'react'
import { Link } from 'react-router-dom'

interface ItemNavInterface {
    image: string,
    title: string,
    to: string
}

export default function ItemNav({image, title, to} : ItemNavInterface) {
    return (
        <Link to={to} className='flex items-center my-5'>
            <img src={image} alt="Fundos Imobliarios" className='h-[50px] w-[50px] mx-auto xl:mx-0 xl:mr-3' />
            <p className='text-xl hidden xl:block'>{title}</p>
        </Link>
    )
}
