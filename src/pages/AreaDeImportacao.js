import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavBarImportacao from '../components/NavBarImportacao'
import Login from '../components/Login'

const AreaDeImportacao = () => {
    
  const [dadosUsuarios, setDadosUsuarios] = useState(JSON.parse(localStorage.getItem("usuario")))

  return (
    <div className="AreaImportacao">
        <div className="conteudoImportacao">
        {dadosUsuarios ? 
                  <Outlet /> :
          <Login dadosUsuarios={dadosUsuarios} setDadosUsuarios={setDadosUsuarios} />
              }
        </div>
          <NavBarImportacao dadosUsuarios={dadosUsuarios} setDadosUsuarios={setDadosUsuarios}  />
    </div>
  )
}

export default AreaDeImportacao