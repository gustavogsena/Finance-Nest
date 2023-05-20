import React, { useState } from 'react'
import ItemNav from './ItemNav'
import fiis from '../images/fiis.png'
import acoes from '../images/acoes.png'
import consolidado from '../images/consolidado.png';
import rendaFixa from '../images/rendaFixa.png';
import operacoes from '../images/operacoes.png'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Nav() {
    const [show, setShow] = useState(false)


    return (
        <nav className={`flex flex-col  md:pl-0 w-[100px] mt-12 relative ${show ? ' xl:min-w-[380px] xl:pl-24' : ''}`}>
            <span className={`xl:block hidden text-4xl text-verde-300 ${!show ? 'self-center' : 'pr-4'}`} onClick={() => setShow(!show)}>
                {!show ?
                    <IoIosArrowForward /> :
                    <div className='flex justify-center'>
                        <span className='text-2xl ml-auto underline'>MENU</span>
                        <IoIosArrowBack className='ml-auto' />
                    </div>}
            </span>
            <ItemNav to='/fiis' image={fiis} title='Fundos Imobiliarios' show={show} />
            <ItemNav to='/acoes' image={acoes} title='Ações' show={show} />
            <ItemNav to='/proventos' image={rendaFixa} title='Proventos' show={show} />
            <ItemNav to='/operacoes' image={operacoes} title='Operações' show={show} />
            <ItemNav to='/consolidado' image={consolidado} title='Consolidado' show={show} />
            <ItemNav to='/adicionar' image={consolidado} title='Adicionar' show={show} />
        </nav>
    )
}

export default Nav
