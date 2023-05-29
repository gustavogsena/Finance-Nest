import React, { useState } from 'react'
import ItemNav from './ItemNav'
import fiis from '../images/fiis.png'
import acoes from '../images/acoes.png'
import consolidado from '../images/consolidado.png';
import adicionar from '../images/adicionar.png';
import rendaFixa from '../images/rendaFixa.png';
import proventos from '../images/proventos.png';
import operacoes from '../images/operacoes.png'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Nav() {
    const [show, setShow] = useState(false)

    const showOff = () => {
        setShow(false)
    }

    return (
        <nav className={`flex flex-col w-[100px] mt-12 relative ${show ? ' min-w-full sm:min-w-[380px] pl-24' : ''}`}>
            <span className={`xl:block text-4xl text-verde-300 ${!show ? 'self-center' : 'pr-4'}`} onClick={() => setShow(!show)}>
                {!show ?
                    <IoIosArrowForward className='cursor-pointer'/> :
                    <div className='flex justify-center'>
                        <span className='text-2xl ml-auto underline'>MENU</span>
                        <IoIosArrowBack className='ml-auto cursor-pointer' />
                    </div>}
            </span>
            <ItemNav to='/fiis' image={fiis} title='Fundos Imobiliarios' show={show} onClick={showOff}/>
            <ItemNav to='/acoes' image={acoes} title='Ações' show={show} onClick={showOff}/>
            <ItemNav to='/operacoes' image={operacoes} title='Operações' show={show} onClick={showOff}/>
            <ItemNav to='/proventos' image={proventos} title='Proventos' show={show} onClick={showOff} />
            <ItemNav to='/consolidado' image={consolidado} title='Consolidado' show={show} onClick={showOff} />
            <ItemNav to='/adicionar' image={adicionar} title='Adicionar' show={show} onClick={showOff}/>
        </nav>
    )
}

export default Nav
