import React from 'react'
import ItemNav from './ItemNav'
import fiis from '../images/fiis.png'
import acoes from '../images/acoes.png'
import consolidado from '../images/consolidado.png';
import rendaFixa from '../images/rendaFixa.png';
import operacoes from '../images/operacoes.png'

function Nav() {
    return (
        <nav className='flex flex-col xl:pl-24 md:pl-0 w-[100px] xl:min-w-[380px] mt-12 '>
            <ItemNav to='/fiis' image={fiis} title='Fundos Imobiliarios' />
            <ItemNav to='/acoes' image={acoes} title='Ações' />
            <ItemNav to='/proventos' image={rendaFixa} title='Proventos' />
            <ItemNav to='/operacoes' image={operacoes} title='Operações' />
            <ItemNav to='/consolidado' image={consolidado} title='Consolidado' />
            <ItemNav to='/adicionar' image={consolidado} title='Adicionar' />
        </nav>
    )
}

export default Nav
