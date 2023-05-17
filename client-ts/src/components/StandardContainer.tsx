import React from 'react'

type StandartContainerType = {
    children: JSX.Element | JSX.Element[]
}

function StandardContainer({ children } : StandartContainerType) {
    return (
        <div className='p-4 sm:p-6 md:p-11 h-full'>
            {children}
        </div>
    )
}

export default StandardContainer