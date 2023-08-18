import { useEffect, useState } from "react";
import InputXML from "./components/InputXML";
import x2js from 'x2js'

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tabela from "./components/Tabela";

import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Alert from '@mui/material/Alert';

function App() {
  const [files, setFiles] = useState();
  const [allData, setAllData] = useState();
  const [cont, setCont] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const linhas = [];

  function createData(chave, nNF, dataCompleta, empresa, cfop,vProd, prod, ipi, cst, idLinha,valorDesc, valorOutro,valorFrete,valorAliquota) {
    return { chave, nNF, dataCompleta, empresa, cfop,vProd, prod, ipi, cst,idLinha,valorDesc, valorOutro, valorFrete,valorAliquota};
  }


  const dadosNotas = (dados) => {
    for (var nota in dados) {
      if (dados.hasOwnProperty(nota)) {
        var idLinha = 0;
        var valorIPI;
        var valorCST = "00";
        var valorDesc, valorOutro, valorFrete, valorAliquota;
        const qtdItem = (dados[nota].det.length ? dados[nota].det.length : 1);
        const data = new Date(dados[nota].ide.dhEmi);
        const dataCompleta = "" + (parseInt(data.getDate() < 10 ? "0" : "")) + data.getDate() + "/" + (parseInt(data.getMonth() < 9 ? "0" : "")) +(parseInt(data.getMonth()) + 1) + "/" + data.getFullYear()
          if (qtdItem > 1) {
            for (var ind = 0; ind < qtdItem; ind++) {
              if (dados[nota].det[ind].imposto !== undefined) {
                if (dados[nota].det[ind].imposto.IPI !== undefined) {
                  if (dados[nota].det[ind].imposto.IPI.IPITrib !== undefined) {
                    valorIPI = dados[nota].det[ind].imposto.IPI.IPITrib.vIPI
                  } else {
                    valorIPI = "0.00"
                  }
                } else {
                  valorIPI = "0.00"
                }
              } else {
                valorIPI = "0.00"
              }
              if (Object.values(dados[nota].det[ind].imposto.ICMS)[0].CST === "20" || Object.values(dados[nota].det[ind].imposto.ICMS)[0].CST === "00") {
                valorCST = Object.values(dados[nota].det[ind].imposto.ICMS)[0].CST
                valorDesc = (parseFloat(dados[nota].total.ICMSTot.vDesc) / qtdItem).toFixed(2)
                valorOutro = (parseFloat(dados[nota].total.ICMSTot.vOutro) / qtdItem).toFixed(2)
                valorFrete = (parseFloat(dados[nota].total.ICMSTot.vFrete) / qtdItem).toFixed(2)
                var valorTotal = parseFloat(valorIPI) + parseFloat(valorOutro) + parseFloat(valorFrete) - parseFloat(valorDesc) + parseFloat(dados[nota].det[ind].prod.vProd);
                var valorDividendo = (valorCST === "00" ? 3.6 / 100 : 1.4 / 100);
                valorAliquota = (valorTotal * valorDividendo).toFixed(2)
                linhas.push(createData(nota,
                  dados[nota].ide.nNF,
                  dataCompleta,
                  dados[nota].emit.xNome,
                  dados[nota].det[ind].prod.CFOP,
                  dados[nota].det[ind].prod.vProd,
                  dados[nota].det[ind].prod.xProd,
                  valorIPI,
                  valorCST,
                  idLinha,
                  valorDesc,
                  valorOutro,
                  valorFrete,
                valorAliquota))
              } 
              idLinha++;
              }
          } else {
            if (dados[nota].det.imposto !== undefined) {
              if (dados[nota].det.imposto.IPI !== undefined) {
                if (dados[nota].det.imposto.IPI.IPITrib !== undefined) {
                  valorIPI = dados[nota].det.imposto.IPI.IPITrib.vIPI
                } else {
                  valorIPI = "0.00"
                }
              } else {
                valorIPI = "0.00"
              }
            } else {
              valorIPI = "0.00"
            }
            if (Object.values(dados[nota].det.imposto.ICMS)[0].CST==="20" || Object.values(dados[nota].det.imposto.ICMS)[0].CST==="00") {
              valorCST = Object.values(dados[nota].det.imposto.ICMS)[0].CST
              valorDesc = (parseFloat(dados[nota].total.ICMSTot.vDesc) / qtdItem).toFixed(2)
              valorOutro = (parseFloat(dados[nota].total.ICMSTot.vOutro) / qtdItem).toFixed(2)
              valorFrete = (parseFloat(dados[nota].total.ICMSTot.vFrete) / qtdItem).toFixed(2)
              var valorTotal = parseFloat(valorIPI) + parseFloat(valorOutro) + parseFloat(valorFrete) - parseFloat(valorDesc) + parseFloat(dados[nota].det.prod.vProd);
              var valorDividendo = (valorCST === "00" ? 3.6 / 100 : 1.4 / 100);
              valorAliquota = (valorTotal * valorDividendo).toFixed(2)
              linhas.push(createData(nota,
                dados[nota].ide.nNF,
                dataCompleta,
                dados[nota].emit.xNome,
                dados[nota].det.prod.CFOP,
                dados[nota].det.prod.vProd,
                dados[nota].det.prod.xProd,
                valorIPI,
                valorCST,
                idLinha,
                valorDesc,
                valorOutro,
                valorFrete,
                valorAliquota
              ))
            }
            idLinha++;
          }
        setAllData([...linhas]);
      }
  }
  }

  const steps = [
    'Selecionar Arquivos',
    'Filtrar Dados',
    'Exportar para Excel',
  ];

  const getActiveContente = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="centralizar">
            <div className="UploadBox" >
            <InputXML 
            setFiles={setFiles}
            />
            <div className="LadoDireito">
              {files !== undefined ?
                <div className="InfoProgress">
                  <div style={{marginBottom: '20px', marginRight: '5px'}}>
                    {cont === files.length ? <CheckCircleIcon sx={{ color: '#6d38f9' }} size={90} /> : <CircularProgress sx={{ color: '#6d38f9' }} size={28} />}
                    </div>
                  <div>
                    <div className="ArquivosProntos">
                    {cont + "/" + files.length + ' arquivos prontos'}
                    </div> 
                    <BorderLinearProgress variant="determinate" value={cont * 100 / files.length} />
                </div>
                </div> : ''}
              {files !== undefined && cont === files.length && allData.length === 0 ?
              <Alert severity="warning">Arquivo selecionado não possui <br/> nenhuma NFe com CST 00 ou 20. <br/>Por favor, selecione uma outra nota.</Alert>
              : ""}

              {files === undefined || cont !== files.length || allData.length === 0 ? "" : 
                <div className="BotaoContinuar">
                  <button id="continueButton"
                onClick={()=>{setActiveStep(activeStep+1)}}>
                <h4>Continuar</h4> <ArrowForwardIcon size={18}/>
              </button>
              </div>
              }
            </div>
          </div>
          </div>
        );
        case 1:
          return (
            <Tabela allData={allData}/>
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
    width: 250,
    marginBottom: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#6d38f9' : '#6d38f9',
    },
  }));

  useEffect(() => {
    if (files !== undefined) {
      var convert = new x2js();
      var chave, jsonDoc, prov, todosDados;
      readmultifiles(files); 
      function readmultifiles(files) {
        setCont(0);
        var reader = new FileReader(); 
        function readFile(index) {
          if( index >= files.length ) return;
          var file = files[index];
          reader.onload = function(e) {  
            jsonDoc = convert.xml2js(reader.result);
            chave = jsonDoc.nfeProc.NFe.infNFe._Id.replace("NFe", "");
            prov = { [chave]: { ...jsonDoc.nfeProc.NFe.infNFe } }
            if (files.length === 1) {
              todosDados = prov;
            } else {
              todosDados = {...todosDados, ...prov}
            }
            setCont(index+1)
            readFile(index + 1)
            if (index === files.length - 1) {
              dadosNotas(todosDados);
            }
          }
          reader.readAsText(file);
        }
        readFile(0);
      }
    }
  }, [files])

  return (
    <div className="App">
      <div style={{marginTop: '20px', display: 'none'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
                <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
      {getActiveContente()}
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        {activeStep === 0 ? '' :
          <div className="BotaoVoltar">
          <button id="backButton"
        onClick={()=>{setActiveStep(activeStep-1)}}>
        <h4>Voltar</h4> 
      </button>
      </div>}
      </div>
    </div>
  );
}

export default App;
