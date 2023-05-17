import React from 'react'
import InfoContainer from '../components/InfoContainer'
import { RootState } from '../store'
import { ConsolidatedAsset } from '../types'
import { useSelector } from 'react-redux'
import StandardContainer from '../components/StandardContainer'

function Consolidado() {
    const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
    return (
        <StandardContainer>

            <InfoContainer title='Minha Carteira' data={consolidado.total} />
            <InfoContainer title='Ações' data={consolidado.stockshare} />
            <InfoContainer title='Fundos Imobiliarios' data={consolidado.realestate} />

        </StandardContainer>

    )
}

export default Consolidado