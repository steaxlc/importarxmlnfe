import React, { useState } from 'react'

import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from '../services/firebase'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate,useLocation  } from "react-router-dom";

const Login = ({ setDadosUsuarios}) => {
    const [continuarLogado, setContinuarLogado] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();
  
    function handleGoogleSignIn() {
      const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
          .then((result) =>
          {
              if (continuarLogado)
                  localStorage.setItem("usuario", JSON.stringify(result.user));
            setDadosUsuarios(result.user)
            if( location.pathname.includes("/xmlnfe") || location.pathname.includes("/xmlcfe"))
              navigate(location.pathname)
            else {
              navigate("/importarxmlnfe/xmlnfe")
            }
          }
        )
            .catch((error) => {
              alert("Não foi possível realizar o login ou o e-mail selecionado não é autorizado, por favor tente novamente.")
          console.log(error)
        })
      }

  return (
      <div className='centralizar'>
          <div className="UploadBox"> 
              <div className="InfoLogin">
                  <h1>Login</h1>
                  <h3>Para ter acesso as funcionalidades de Importação de NFe,<br />
                      por favor faça login com um email autorizado.</h3>
                  <div className="ContinuarLogado">
                    <input type='checkbox' id='checkbox' onChange={() => setContinuarLogado(!continuarLogado)} />
                    <label for="checkbox">Lembrar-me</label>
                  </div>
                  <button className='BotaoLogar'  onClick={handleGoogleSignIn}> <GoogleIcon/> <span>Continuar com Google</span> </button>
              </div>
          </div>
    </div>
  )
}

export default Login