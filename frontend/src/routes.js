import React, { useContext } from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {Context} from './Context/AuthContext'

import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import MeusAnuncios from './pages/MeusAnuncios';
import Perfil from './pages/Perfil';
import EditPerfil from './pages/EditPerfil';
import MyProducts from './pages/produtos/MyProducts';
import NovoProduto from './pages/NovoProduto';
import Produtos from './pages/produtos/index'
import ProdId from './pages/produtos/ProdId';
import EditProduto from './pages/produtos/EditProduto';
import Navbar from './components/Navbar';


const Private = ({Item}) => {

    const { signed } = useContext(Context);

    return signed ? <div><Navbar/><Item/></div>  : <Login/>;
}

function rotas(){
    
    return(
      <BrowserRouter>
          <Routes>
            <Route exact path='/'  element={<Private Item={Home}/>}/>
            <Route exact path=''  element={<Private Item={Home}/>}/>
            
            <Route isPrivate exact path='/meusprodutos'  element={<Private Item={MyProducts}/>}/>
            <Route exact path='/meusanuncios'  element={<Private Item={MeusAnuncios}/>}/>
            <Route exact path='/perfil'  element={<Private Item={Perfil}/>}/>
            <Route exact path='/editperfil'  element={<Private Item={EditPerfil}/>}/>
            <Route exact path='/novoproduto'  element={<Private Item={NovoProduto}/>}/>
            <Route exact path='/produtos' element={<Private Item={Produtos}/>}/>
            <Route path="/produtos/:topicId" element={<Private Item={Topic}/>}/>
            <Route path="/produtos/:topicId/edit" element={<Private Item={EditaAnuncio}/>}/>
            <Route exact path='/login'  element={<Login/>}/>
            <Route exact path='/registro'  element={<Registro/>}/>
          </Routes>
  
      </BrowserRouter>
    )
  }

const Topic = () => {
  
  const location = useLocation();
  const pathId = (location.pathname.split('/'))[2]
  //console.log(location.pathname)
  //console.log(pathId)
  
  return <div><ProdId id={pathId}/></div>;
};

const EditaAnuncio = () => {
    
  const location = useLocation();
  const pathId = (location.pathname.split('/'))[2]
  //console.log(location.pathname)
  //console.log(pathId)
  
  return <div><EditProduto id={pathId}/></div>;
};
  
export default rotas;