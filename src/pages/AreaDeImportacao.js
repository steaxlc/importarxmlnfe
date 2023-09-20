import React from 'react'
import { useState } from 'react'
import { Outlet,useLocation } from 'react-router-dom'

import NavBarImportacao from '../components/NavBarImportacao'
import Login from '../components/Login'
import ImportarXMLNFe from './ImportarXMLNFe'

const AreaDeImportacao = () => {
    
  const [dadosUsuarios, setDadosUsuarios] = useState(JSON.parse(localStorage.getItem("usuario")))
  let location = useLocation();

  return (
    <div className="AreaImportacao">
        <div className="conteudoImportacao">
        {dadosUsuarios ? 
          <> {(location.pathname.includes("/xmlnfe") || location.pathname.includes("/xmlcfe") || location.pathname.includes("/txtsped")) ? <Outlet location={location} /> : <ImportarXMLNFe />} </>
                   :
          <Login dadosUsuarios={dadosUsuarios} setDadosUsuarios={setDadosUsuarios} />
              }
        </div>
          <NavBarImportacao dadosUsuarios={dadosUsuarios} setDadosUsuarios={setDadosUsuarios}  />
    </div>
  )
}

export default AreaDeImportacao