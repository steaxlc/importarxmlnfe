import { useEffect, useState } from "react";
import InputTXT from "../components/InputTXT";
import { useLocation } from 'react-router-dom'

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Tabela from "../components/TabelaSped";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function ImportarTXTSped({ location }) {
  location = useLocation();

  const [files, setFiles] = useState();
    const [allData, setAllData] = useState();
  const [cont, setCont] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const linhasDados = [];
    const linhasProdutos = []
  const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [dadosFiltrados, setDadosFiltrados] = useState();
    var teste;

    function createProduto(Cod_Produto, Produto, NCM) {
        return {Cod_Produto, Produto, NCM}
    }
    
  function createData(Cod_Produto, NCM , Produto, CST, CFOP, Valor_Produto, PIS, COFINS
  ) {
    return {
        Cod_Produto, NCM, Produto, CST, CFOP,Valor_Produto,  PIS, COFINS
    };
  }


    const dadosSped = (dados) => {
        for (var ind = 0; ind < dados.length; ind ++) {
            if (dados.hasOwnProperty(ind)) {
                if (dados[ind].includes("|0200|")) {
                    const prov = dados[ind].split("|");
                    linhasProdutos.push(createProduto(prov[2], prov[3], prov[8]))
                } else if (dados[ind].includes("|C170|")) {
                        const prov = dados[ind].split("|");
                        const pos = linhasProdutos.map(e => e.Cod_Produto).indexOf(prov[3]);
                        if (pos !== -1) {
                            linhasDados.push(createData(linhasProdutos[pos].Cod_Produto,
                                linhasProdutos[pos].NCM,
                                linhasProdutos[pos].Produto,
                                prov[10],
                                prov[11],
                                prov[7],
                                prov[30],
                                prov[36]))
                        }
                } else if (dados[ind].includes("|0140|")) {
                    const prov = dados[ind].split("|");
                    if(prov[1] !== '9900')
                        setNomeEmpresa(prov[3])
                }
                
            };
        };
        setAllData([...linhasDados]);
        setDadosFiltrados([...linhasDados])
        setIsLoading(false)
  }

  const getActiveContente = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="centralizar">
            <div className="UploadBox" >
            <InputTXT title="Sped"
            setFiles={setFiles} 
            />
            <div className="LadoDireito">
              {files !== undefined ?
                <div className={`InfoProgress`}>
                    <div style={{marginBottom: '20px', marginRight: '5px'}}>
                        {!isLoading && <CheckCircleIcon sx={{ color: '#3D1A78' }} size={90} />}
                    </div>
                    <div>
                        <div className={`ArquivosProntos  ${!isLoading && "Subir"}`}>
                            { isLoading ? 'Aguarde, os dados estão sendo analisados' : 'Processo finalizado, pode prosseguir'}
                        </div> 
                        {isLoading && <BorderLinearProgress />}
                    
                    </div>
                </div> : ''}

              {files === undefined || isLoading  ? "" : 
                <div className="BotaoContinuar">
                  <button id="continueButton"
                onClick={()=>{setActiveStep(activeStep+1)}}>
                <h3>Continuar</h3> <ArrowForwardIcon size={18}/>
              </button>
              </div>
              }
            </div>
          </div>
          </div>
        );
        case 1:
          return (
            <Tabela nomeEmpresa={nomeEmpresa}
              allData={allData}
              dadosFiltrados={dadosFiltrados}
              setDadosFiltrados={setDadosFiltrados}
            />
          )
        case 2:
          return (
            <div>Testcando</div>
          )
      default:
        return (
          <div>nada pra ver</div>
        )
    }
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    width: 283,
    marginBottom: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#3D1A78' : '#3D1A78',
    },
  }));

  useEffect(() => {
    if (files !== undefined) {
        var reader = new FileReader(); 
        setIsLoading(true)
        function readFile(index) {
          if( index >= files.length ) return;
          var file = files[index];
          reader.onload = function(e) {  
              const txtResult = reader.result;
              const linesResult = txtResult.split(/\r\n|\n/);
              dadosSped(linesResult)
              
          }
          reader.readAsText(file);
        }
        readFile(0);
    }
  }, [files])


  return (
    <div className="App">
      {getActiveContente()}
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {activeStep === 0 ? '' :
            <div className="BotaoVoltar">
              <button id="backButton"
                onClick={() => { setActiveStep(activeStep - 1) }}>
                <h4>Voltar</h4>
              </button>
            </div>}
        </div>
    </div>
  );
}

export default ImportarTXTSped;
