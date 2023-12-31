import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

import './NavBarImportacao.css'

import ImportExportIcon from '@mui/icons-material/ImportExport';
import MenuIcon from '@mui/icons-material/Menu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FeedIcon from '@mui/icons-material/Feed';


const NavBarImportacao = ( {dadosUsuarios, setDadosUsuarios}) => {
    const [menuOpen, setMenuOpen] = useState(false)

    function handleSair() {
        localStorage.removeItem("usuario")
        setDadosUsuarios(null)
    }

  return (
      <div>
          <div className={`sidebar ${menuOpen? "aberto" : ""}`}>
              <div className="top">
                  <div className="logo">
                    <ImportExportIcon/>
                    <span>Área de Importação</span>
                  </div>
                  <MenuIcon onClick={()=>setMenuOpen(!menuOpen) } id="btn" />
              </div>
              <div className="user">
                  {dadosUsuarios && <>
                      <img src={dadosUsuarios.photoURL} alt="foto usuario" className='userimg' />
                    <div className="bold">
                      <p>{dadosUsuarios.displayName}</p>
                      <p>{dadosUsuarios.email}</p>
                      </div>
                  </>}
              </div>
              <ul>
                  <li>
                    <Link to="xmlnfe">
                        <NewspaperIcon/> <span className="navitem">Importar NFe</span>
                      </Link>
                      <span className="tooltip">Importar NFe</span>
                  </li>
                  <li>
                    <Link to="xmlcfe">
                        <ReceiptIcon/> <span className="navitem">Importar CFe</span>
                      </Link>
                      <span className="tooltip">Importar CFe</span>
                  </li>
                  <li>
                    <Link to="txtsped">
                        <FeedIcon/> <span className="navitem">Importar Sped</span>
                      </Link>
                      <span className="tooltip">Importar Sped</span>
                  </li>
              </ul>
              <div className="bottom" onClick={handleSair}>
                <ExitToAppIcon id="sair" />
                  <span className="textosair">Sair</span>
                  <span className="tooltip">Sair</span>
              </div>
          </div>
    </div>
  )
}

export default NavBarImportacao