import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter, } from 'react-router-dom';
import PaginaPadrao from './components/PaginaPadrao';
import Home from './pages/Home';
import FundosImobiliarios from './pages/FundosImobiliarios';
import Acoes from './pages/Acoes';
import Operacoes from './pages/Operacoes';
import Consolidado from './pages/Consolidado';
import RendaFixa from './pages/RendaFixa';
import Login from './pages/Login';
import { browserHistory } from './browserHistory';
import LoadAuthUser from './LoadAuthUser';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { User } from './types';
import SingleAsset from './pages/SingleAsset';
import Proventos from './pages/Proventos';
import Forms from './pages/Forms';

function App() {
  const user = useSelector<RootState, User>(state => state.user)

  return (
    <HistoryRouter history={browserHistory}>
      <LoadAuthUser />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<Home />} />
          <Route path="/fiis" element={<FundosImobiliarios />} />
          <Route path="/acoes" element={<Acoes />} />
          <Route path="/rendafixa" element={<RendaFixa />} />
          <Route path="/operacoes" element={<Operacoes />} />
          <Route path="/consolidado" element={<Consolidado />} />
          <Route path="/asset" element={<SingleAsset />} />
          <Route path="/proventos" element={<Proventos />} />
          <Route path="/adicionar" element={<Forms />} />
          <Route path="/adicionar/:param" element={<Forms />} />
        </Route>
      </Routes>
    </HistoryRouter>

  );
}

export default App;
