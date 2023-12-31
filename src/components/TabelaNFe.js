import DataTable from 'react-data-table-component';

import SelectCST from './SelectCST';
import SelectCFOP from './SelectCFOP';
import { useState, useMemo } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Tabela({ allData, nomeEmpresa, dadosFiltrados, setDadosFiltrados, pdfNotas}) {
  
const columns = [
  {
      name: 'Chave',
    selector: row => row.Chave,
    width: '370px',
    sortable: true,
    reorder: true,
  },
  {
      name: 'Nota Fiscal',
    selector: row => row.Nota_Fiscal,
    width: '110px',
    sortable: true,
    reorder: true,
  },
  {
      name: 'Data Emissão',
    selector: row => row.Data,
    width: '120px',
    sortable: true,
    reorder: true,
  },
  {
      name: 'Empresa',
      selector: row => row.Empresa,
      width: '300px',
      sortable: true,
      reorder: true,
  },
  {
      name: 'Produto',
      selector: row => row.Produto,
      width: '350px',
      sortable: true,
      reorder: true,
  },
  {
      name: 'CST',
      selector: row => row.CST,
      width: '80px',
      sortable: true,
      reorder: true,
  },
  {
      name: 'CFOP',
      selector: row => row.CFOP,
      width: '100px',
      sortable: true,
      reorder: true,
  },
  {
      name: 'IPI',
      selector: row => row.IPI,
      width: '60px',
      reorder: true,
  },
  {
      name: 'Valor',
    selector: row => row.Valor_Produto,
    width: '100px',
    right: true,
    reorder: true,
  },
  {
      name: 'Desconto',
    selector: row => row.Desconto,
    width: '100px',
    right: true,
    sortable: true,
    reorder: true,
  },
  {
      name: 'Outro',
    selector: row => row.Outras_Despesas,
    width: '100px',
    right: true,
    sortable: true,
    reorder: true,
  },
  {
      name: 'Frete',
    selector: row => row.Frete,
    width: '80px',
    right: true,
    sortable: true,
    reorder: true,
  },
  {
      name: 'ICMS',
    selector: row => row.ICMS,
    width: '80px',
    right: true,
    reorder: true,
  },
  {
      name: 'DANFE',
    selector: row => danfePdf(row.Chave),
    width: '80px',
    center: true,
    reorder: true,
  },
  ];
  
  const danfePdf = (chave) => {
    return <div style={{cursor: "pointer"}} onClick={()=> imprimirPdf(chave)}><PictureAsPdfIcon /></div>
  }

  const imprimirPdf = async (chave) => {
    let corpo = pdfNotas[chave]
    let base = await fetch('https://ws.meudanfe.com/api/v1/get/nfe/xmltodanfepdf/API', {
         method: "POST",
         body: corpo
    });
    if (200 !== base.status) {
      alert("Falha ao gerar PDF! Por favor, tente mais tarde.")
    }
    let pdf = await base.json();
    try {
      let novaAba = window.open("about:blank");
      novaAba.document.write("<html<head><title>" + chave + ".pdf</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style></head>")
      novaAba.document.write("<body><embed width='100%' height='100%' src='data:application/pdf;base64," + pdf + "'></embed></body></html>")
  } catch (l) {
      alert("Para a exibiçãoo do PDF, favor permitir janela pop-up no navegador. Após permitir favor tentar novamente.")
  }
  }

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

  const temChave = (item) => {
    if (item.Chave.includes(selectedChave)) {
      return true
    } else {
      return false
    }
  }

  const temNota = (item) => {
    if (item.Nota_Fiscal.includes(selectedNota)) {
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
  const [selectedChave, setSelectedChave] = useState("");
  const [selectedNota, setSelectedNota] = useState("");
  const [sumICMS, setSumICMS] = useState(somarICMS(allData));

  function handleFilter () {
    const temp = allData.filter(
      item => (temCFOP(item) && temCST(item) && temChave(item) && temNota(item))
    ) 
    setDadosFiltrados(temp)
    setSumICMS(somarICMS(temp))
  }

  const handleDownload = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dadosFiltrados);
    
    XLSX.utils.book_append_sheet(wb, ws, "ICMS");

    XLSX.writeFile(wb, `ICMS - ${nomeEmpresa}.xlsx`);
    
  }

  const actionsMemo = useMemo(() => <button className='downloadButton' onClick={handleDownload}><span>Exportar Excel</span></button>, [dadosFiltrados]);

  return (
    <div className='paginaTabela'>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
          <Grid item xs={9}>
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
                <TextField id="chave" label="Chave" fullWidth onChange={(e)=> setSelectedChave(e.target.value)} variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField id="notaFiscal" label="Nota Fiscal" onChange={(e)=> setSelectedNota(e.target.value)}  fullWidth  variant="outlined" />
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
                <div className="alinharDireita">
                  <button className='downloadButton' onClick={handleFilter}>Atualizar  Tabela</button>
                </div>
              </Grid>
            </div>
        </Grid>
          <Grid item xs={3}>
            <div className="somaAliquota">
              <div className="dadosSomatorio">
              <h2>Somatório ICMS</h2>
              <h2>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumICMS.toFixed(2)) }</h2>

              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className="tabela">
          <DataTable
        title={`Cálculo ICMS - ${nomeEmpresa}`}
          columns={columns}
        data={dadosFiltrados}
        dense
        pagination
        highlightOnHover
        striped
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