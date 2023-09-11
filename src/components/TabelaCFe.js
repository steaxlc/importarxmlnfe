import DataTable from 'react-data-table-component';

import SelectCST from './SelectCST';
import SelectCFOP from './SelectCFOP';
import { useState, useMemo } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Tabela({ allData, nomeEmpresa, dadosFiltrados, setDadosFiltrados}) {

  
const columns = [
  {
      name: 'Chave',
    selector: row => row.Chave,
    width: '370px',
    sortable: true,
    reorder: true,
  },
  {
      name: 'Cupom Fiscal',
    selector: row => row.Cupom_Fiscal,
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
  // {
  //     name: 'Data Emissão',
  //   selector: row => row.Data,
  //   width: '120px',
  //   sortable: true,
  //   reorder: true,
  // },
  // {
  //     name: 'Empresa',
  //     selector: row => row.Empresa,
  //     width: '300px',
  //     sortable: true,
  //     reorder: true,
  // },
  {
      name: 'Produto',
      selector: row => row.Produto,
      grow: 2,
      sortable: true,
      reorder: true,
  },
  {
      name: 'CST',
      selector: row => row.CST,
      grow: 1,
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
  // {
  //     name: 'IPI',
  //     selector: row => row.IPI,
  //     width: '60px',
  //     reorder: true,
  // },
  {
      name: 'Valor',
    selector: row => row.Valor_Produto,
    grow: 1,
    right: true,
    reorder: true,
  },
  // {
  //     name: 'Desconto',
  //   selector: row => row.Desconto,
  //   width: '100px',
  //   right: true,
  //   sortable: true,
  //   reorder: true,
  // },
  // {
  //     name: 'Outro',
  //   selector: row => row.Outras_Despesas,
  //   width: '100px',
  //   right: true,
  //   sortable: true,
  //   reorder: true,
  // },
  // {
  //     name: 'Frete',
  //   selector: row => row.Frete,
  //   width: '80px',
  //   right: true,
  //   sortable: true,
  //   reorder: true,
  // },
  // {
  //     name: 'ICMS',
  //   selector: row => row.ICMS,
  //   width: '80px',
  //   right: true,
  //   reorder: true,
  // },
  ];
  
  const temCST = (item) => {
    if (selectedCST.length > 0) {
      for (var ind = 0; ind < selectedCST.length; ind++){
        if (item.CST === selectedCST[ind]) {
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

  const temNota = (item) => {
    if (item.Cupom_Fiscal.includes(selectedCupom)) {
      return true
    } else {
      return false
    }
  }

  const somarICMS = (item) => {
    var temp = 0;
    item.map((nota) => temp = temp + parseFloat(nota.ICMS))
    return temp
  }
  const rowsPerPageText = { rowsPerPageText: 'Linhas por Página:' }
  const [selectedCST, setSelectedCST] = useState([]);
  const [selectedCFOP, setSelectedCFOP] = useState([]);
  const [selectedNCM, setSelectedNCM] = useState("");
  const [selectedCupom, setSelectedCupom] = useState("");
  const [sumICMS, setSumICMS] = useState(somarICMS(allData));

  function handleFilter () {
    const temp = allData.filter(
      item => (temCFOP(item) && temCST(item) && temNCM(item) && temNota(item))
    ) 
    setDadosFiltrados(temp)
    setSumICMS(somarICMS(temp))
  }

  const handleDownload = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dadosFiltrados);
    
    XLSX.utils.book_append_sheet(wb, ws, "CFe");

    XLSX.writeFile(wb, `CFe - ${nomeEmpresa}.xlsx`);
    
  }

  const actionsMemo = useMemo(() => <button className='downloadButton' onClick={handleDownload}><span>Exportar Excel</span></button>, [dadosFiltrados]);

  return (
    <div className='paginaTabela'>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className='filtros'>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="titulo">
                    Filtros da Tabela
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                <TextField id="ncm" label="NCM" fullWidth onChange={(e)=> setSelectedNCM(e.target.value)} variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField id="cupomFiscal" label="Cupom Fiscal" onChange={(e)=> setSelectedCupom(e.target.value)}  fullWidth  variant="outlined" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                    <SelectCST allData={allData} setSelectedCST={setSelectedCST} />
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
        </Grid>
        <Grid item xs={12}>
          <div className="tabela">
          <DataTable
        title={`CFe - ${nomeEmpresa}`}
          columns={columns}
        data={dadosFiltrados}
        dense
        pagination
        highlightOnHover
        striped
        pointerOnHover
        actions={actionsMemo}
        paginationRowsPerPageOptions={[10, 25, 50, 200, 200]}
          paginationComponentOptions={rowsPerPageText}
      />
        </div>
          </Grid>
    </Box>
      
      </div>
      );
}