import { useEffect, useState } from "react";
import InputXML from "../components/InputXML";
import x2js from 'x2js'

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Tabela from "../components/TabelaNFe";
import Login from "../components/Login";

import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Alert from '@mui/material/Alert';

function ImportarXMLNFe({dadosUsuarios}) {

  const [files, setFiles] = useState();
  const [allData, setAllData] = useState();
  const [cont, setCont] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const linhas = [];
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState();
  const [infoOpen, setInfoOpen] = useState(false);

  function createData(Chave, Nota_Fiscal, Data, Empresa, Produto, CST, CFOP, IPI, Valor_Produto, Desconto, Outras_Despesas, Frete, ICMS) {
    return { Chave, Nota_Fiscal, Data, Empresa, Produto, CST, CFOP, IPI, Valor_Produto, Desconto, Outras_Despesas, Frete, ICMS };
  }


  const dadosNotas = (dados) => {
    for (var nota in dados) {
      if (dados.hasOwnProperty(nota)) {
        var valorIPI;
        var valorCST = "00";
        var valorDesc, valorOutro, valorFrete, valorAliquota;
        const qtdItem = (dados[nota].det.length ? dados[nota].det.length : 1);
        const data = new Date(dados[nota].ide.dhEmi);
        const dataCompleta = (parseInt(data.getDate()) < 10 ? "0" : "") + data.getDate() + "/" + (parseInt(data.getMonth() < 9 ? "0" : "")) +(parseInt(data.getMonth()) + 1) + "/" + data.getFullYear()
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
              if ((Object.values(dados[nota].det[ind].imposto.ICMS)[0].CST === "20" ||
              Object.values(dados[nota].det[ind].imposto.ICMS)[0].CST === "00" ||
              Object.values(dados[nota].det[ind].imposto.ICMS)[0].CSOSN === "101" ||
              Object.values(dados[nota].det[ind].imposto.ICMS)[0].CSOSN === "102" ||
              Object.values(dados[nota].det[ind].imposto.ICMS)[0].CSOSN === "400" ||
                Object.values(dados[nota].det[ind].imposto.ICMS)[0].CSOSN === "900") && (
                  dados[nota].det[ind].prod.CFOP > 4999 && dados[nota].det[ind].prod.CFOP < 6000
              )) {
                valorCST = Object.values(dados[nota].det[ind].imposto.ICMS)[0].CST ?
                  Object.values(dados[nota].det[ind].imposto.ICMS)[0].CST :
                  Object.values(dados[nota].det[ind].imposto.ICMS)[0].CSOSN;
                valorDesc = (parseFloat(dados[nota].total.ICMSTot.vDesc) / qtdItem).toFixed(2)
                valorOutro = (parseFloat(dados[nota].total.ICMSTot.vOutro) / qtdItem).toFixed(2)
                valorFrete = (parseFloat(dados[nota].total.ICMSTot.vFrete) / qtdItem).toFixed(2)
                var valorTotal = parseFloat(valorIPI) + parseFloat(valorOutro) + parseFloat(valorFrete) - parseFloat(valorDesc) + parseFloat(dados[nota].det[ind].prod.vProd);
                var valorDividendo = 1;
                if (valorCST === "00") {
                  valorDividendo = 3.6/100
                } else {
                  if (valorCST === "20") {
                    valorDividendo = 1.4/100
                  } else {
                    valorDividendo = 6.6/100
                  }
                }
                valorAliquota = (valorTotal * valorDividendo).toFixed(2)
                linhas.push(createData(nota,
                  dados[nota].ide.nNF,
                  dataCompleta,
                  dados[nota].emit.xNome,
                  dados[nota].det[ind].prod.xProd,
                  valorCST,
                  dados[nota].det[ind].prod.CFOP,
                  valorIPI,
                  dados[nota].det[ind].prod.vProd,
                  valorDesc,
                  valorOutro,
                  valorFrete,
                valorAliquota))
              } 
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
            if ((Object.values(dados[nota].det.imposto.ICMS)[0].CST === "20" ||
            Object.values(dados[nota].det.imposto.ICMS)[0].CST === "00" ||
            Object.values(dados[nota].det.imposto.ICMS)[0].CSOSN === "101" ||
            Object.values(dados[nota].det.imposto.ICMS)[0].CSOSN === "102" ||
            Object.values(dados[nota].det.imposto.ICMS)[0].CSOSN === "400" ||
              Object.values(dados[nota].det.imposto.ICMS)[0].CSOSN === "900") && (
                dados[nota].det.prod.CFOP > 4999 && dados[nota].det.prod.CFOP < 6000
            )) {
              valorCST = Object.values(dados[nota].det.imposto.ICMS)[0].CST ?
                Object.values(dados[nota].det.imposto.ICMS)[0].CST :
                Object.values(dados[nota].det.imposto.ICMS)[0].CSOSN;
              valorDesc = (parseFloat(dados[nota].total.ICMSTot.vDesc) / qtdItem).toFixed(2)
              valorOutro = (parseFloat(dados[nota].total.ICMSTot.vOutro) / qtdItem).toFixed(2)
              valorFrete = (parseFloat(dados[nota].total.ICMSTot.vFrete) / qtdItem).toFixed(2)
              var valorTotal = parseFloat(valorIPI) + parseFloat(valorOutro) + parseFloat(valorFrete) - parseFloat(valorDesc) + parseFloat(dados[nota].det.prod.vProd);
              var valorDividendo = 1;
              if (valorCST === "00") {
                valorDividendo = 3.6/100
              } else {
                if (valorCST === "20") {
                  valorDividendo = 1.4/100
                } else {
                  valorDividendo = 6.6/100
                }
              }
              valorAliquota = (valorTotal * valorDividendo).toFixed(2)
              linhas.push(createData(nota,
                dados[nota].ide.nNF,
                dataCompleta,
                dados[nota].emit.xNome,
                dados[nota].det.prod.xProd,
                valorCST,
                dados[nota].det.prod.CFOP,
                valorIPI,
                dados[nota].det.prod.vProd,
                valorDesc,
                valorOutro,
                valorFrete,
                valorAliquota
              ))
            }
          }
        setAllData([...linhas]);
        setDadosFiltrados([...linhas])
      }
      setNomeEmpresa(dados[nota].dest.xNome)
  }
  }

  const getActiveContente = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="centralizar">
            <div className="UploadBox" >
            <InputXML title="NFe"
            setFiles={setFiles}
            />
            <div className="LadoDireito">
              {files !== undefined ?
                <div className="InfoProgress">
                  <div style={{marginBottom: '20px', marginRight: '5px'}}>
                    {cont === files.length ? <CheckCircleIcon sx={{ color: '#3D1A78' }} size={90} /> : <CircularProgress sx={{ color: '#3D1A78' }} size={28} />}
                    </div>
                  <div>
                    <div className="ArquivosProntos">
                    {cont + "/" + files.length + ' arquivos prontos'}
                    </div> 
                    <BorderLinearProgress variant="determinate" value={cont * 100 / files.length} />
                </div>
                </div> : ''}
              {files !== undefined && cont === files.length && allData.length === 0 ?
              <Alert severity="warning">Arquivo selecionado não possui  nenhuma<br/> NFe com CST 00, 20, 101, <br/>102, 400 ou 900. <br/>Por favor, selecione uma outra nota.</Alert>
              : ""}

              {files === undefined || cont !== files.length || allData.length === 0 ? "" : 
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
    width: 250,
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

export default ImportarXMLNFe;
