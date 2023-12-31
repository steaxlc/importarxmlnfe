import DataTable from 'react-data-table-component';

import SelectCSTPIS from './SelectCSTPIS';
import SelectCFOP from './SelectCFOP';
import { useState, useMemo } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Tabela({ allData, nomeEmpresa, dadosFiltrados, setDadosFiltrados}) {

  
const columns = [
  {
    name: 'Código Produto',
    selector: row => row.Cod_Produto,
    grow: 1,
    sortable: true,
    reorder: true,
  },
  {
      name: 'NCM',
    selector: row => row.NCM,
    grow: 1,
    sortable: true,
    reorder: true,
  },
  {
      name: 'Produto',
      selector: row => row.Produto,
      grow: 2,
      sortable: true,
      reorder: true,
  },
  {
      name: 'CFOP',
      selector: row => row.CFOP,
      grow: 1,
      sortable: true,
      reorder: true,
  },
  {
      name: 'Valor',
    selector: row => row.Valor_Produto,
    grow: 1,
    right: true,
    reorder: true,
  },
  {
      name: 'CST PIS',
      selector: row => row.CST_PIS,
    grow: 1,
    right: true,
      sortable: true,
      reorder: true,
  },
  {
      name: 'PIS',
    selector: row => row.PIS,
    grow: 1,
    right: true,
    reorder: true,
  },
  {
      name: 'CST COFINS',
      selector: row => row.CST_COFINS,
      grow: 1,
      right: true,
      sortable: true,
      reorder: true,
  },
  {
      name: 'COFINS',
    selector: row => row.COFINS,
    grow: 1,
    right: true,
    reorder: true,
  },
  ];
  
  const temCST = (item) => {
    if (selectedCSTPIS.length > 0) {
      for (var ind = 0; ind < selectedCSTPIS.length; ind++){
        if (item.CST_PIS === selectedCSTPIS[ind]) {
          return true
        }
      }
      return false
    } else {
      return true
    }
  }

  const temCFOP = (item) => {
    if (selectedCFOP.length > 0) {
      for (var ind = 0; ind < selectedCFOP.length; ind++){
        if (item.CFOP === selectedCFOP[ind]) {
          return true
        }
      }
      return false
    } else {
      return true
    }
  }

  const temNCM = (item) => {
    if (item.NCM.includes(selectedNCM)) {
      return true
    } else {
      return false
    }
  }

  const temProd = (item) => {
    if (item.Cod_Produto.includes(selectedCodProd)) {
      return true
    } else {
      return false
    }
  }

  const somarTotProd = (item) => {
    var temp = 0;
    item.map((nota) => temp = temp + parseFloat(nota.Valor_Produto))
    return temp
  }
  const rowsPerPageText = { rowsPerPageText: 'Linhas por Página:' }
  const [selectedCSTPIS, setSelectedCSTPIS] = useState([]);
  const [selectedCFOP, setSelectedCFOP] = useState([]);
  const [selectedNCM, setSelectedNCM] = useState("");
  const [selectedCodProd, setSelectedCodProd] = useState("");
  const [sumTotProd, setSumTotProd] = useState(somarTotProd(allData));
  const todosCST = [...new Set(allData.map(item => item.CST_PIS))];
  const SomatorioTodosCst = [{ id: 0, cst: "", soma: sumTotProd }]
  const [step, setStep] = useState(0);
  todosCST.sort();

  const SumTodosCST = () => {
    for (var ind = 0; ind < todosCST.length; ind++){
      const temp = allData.filter(
        item => (item.CST_PIS === todosCST[ind])
      ) 
      SomatorioTodosCst.push({id: (ind+1), cst: todosCST[ind], soma: somarTotProd(temp)})
    }
  }

  SumTodosCST()

  function handleFilter () {
    const temp = allData.filter(
      item => (temCFOP(item) && temCST(item) && temNCM(item) && temProd(item))
    ) 
    setDadosFiltrados(temp)
    setSumTotProd(somarTotProd(temp))
  }

  const handleDownload = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dadosFiltrados);
    
    XLSX.utils.book_append_sheet(wb, ws, "CFe");

    XLSX.writeFile(wb, `Sped - ${nomeEmpresa}.xlsx`);
    
  }

  const actionsMemo = useMemo(() => <button className='downloadButton' onClick={handleDownload}><span>Exportar Excel</span></button>, [dadosFiltrados]);

  const next = () => {
    if (step < SomatorioTodosCst.length - 1) { 
      setStep(step + 1)
    } else {
      setStep(0)
    }
  }

  const prev = () => {
    if (step > 0) {
      setStep(step - 1)
    } else {
      setStep(SomatorioTodosCst.length - 1)
    }
  }

  return (
    <div className='paginaTabela'>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container>
          <Grid item xs={9}>
            <div className='filtros'>
              <Grid >
                <Grid item xs={12}>
                  <div className="titulo">
                    Filtros da Tabela
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField id="codprod" label="Código do Produto" onChange={(e)=> setSelectedCodProd(e.target.value)}  fullWidth  variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="ncm" label="NCM" fullWidth onChange={(e)=> setSelectedNCM(e.target.value)} variant="outlined" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                    <SelectCSTPIS allData={allData} setSelectedCSTPIS={setSelectedCSTPIS} />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectCFOP allData={allData} setSelectedCFOP={ setSelectedCFOP} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div className="dadoscentrais">
                  <button className='downloadButton' onClick={handleFilter}>Atualizar  Tabela</button>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="somaAliquota">
              <ArrowBackIcon className='esquerda' onClick={prev} />
              <ArrowForwardIcon className='direita' onClick={next } />
              <div className="dadosSomatorio">
                <h2>Valor Total {step !== 0 && <><br/>{`do CST ${SomatorioTodosCst[step].cst}`}</>} </h2>
                <h2>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(SomatorioTodosCst[step].soma)}</h2>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className="tabela">
          <DataTable
        title={`Sped - ${nomeEmpresa}`}
          columns={columns}
        data={dadosFiltrados}
        dense
        pagination
        highlightOnHover
        striped
        pointerOnHover
        actions={actionsMemo}
        paginationRowsPerPageOptions={[10, 25, 50, 200, 500]}
          paginationComponentOptions={rowsPerPageText}
      />
        </div>
          </Grid>
    </Box>
      
      </div>
      );
}