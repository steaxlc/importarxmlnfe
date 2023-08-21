import DataTable from 'react-data-table-component';

import SelectCST from './SelectCST';
import SelectCFOP from './SelectCFOP';
import { useState, useMemo } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';

export default function Tabela({ allData, nomeEmpresa }) {

  
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
  ];
  
  const temCST = (item) => {
    if (selectedCST.length > 0) {
      for (var ind = 0; ind < selectedCST.length; ind++){
        if (item.cst === selectedCST[ind]) {
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
        if (item.cfop === selectedCFOP[ind]) {
          return true
        }
      }
      return false
    } else {
      return true
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
  const [dadosFiltrados, setDadosFiltrados] = useState(allData);
  const [sumICMS, setSumICMS] = useState(somarICMS(allData));

  const handleFilter = () => {
    const temp = allData.filter(
      item => (temCFOP(item) && temCST(item))
    ) 
    setDadosFiltrados(temp)
    setSumICMS(somarICMS(temp))
  }

  const handleDownload = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dadosFiltrados);
    
    XLSX.utils.book_append_sheet(wb, ws, "ICMS");

    XLSX.writeFile(wb, "ICMS.xlsx");
    
  }

  const actionsMemo = useMemo(() => <button className='downloadButton' onClick={handleDownload}><span>Exportar Excel</span></button>, []);

  return (
    <div className='paginaTabela'>
      <div className="centralizarFiltros">
      <div className='filtros'>
          <h1>Filtros da Tabela</h1>
        <div className='camposFiltros'>
        <SelectCST allData={allData} setSelectedCST={setSelectedCST} />
      <SelectCFOP allData={allData} setSelectedCFOP={ setSelectedCFOP} />
      </div>
          <div className="alinharDireita">
          <button className='downloadButton' onClick={handleFilter}>Atualizar  Tabela</button>
      </div>
        </div>
        <div className="somaAliquota">
          <h1>Somatório ICMS</h1>
          <h1>{ sumICMS.toFixed(2)}</h1>
        </div>
      </div>
      <DataTable
        title={`Cálculo ICMS - ${nomeEmpresa}`}
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
      );
}