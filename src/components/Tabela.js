import DataTable from 'react-data-table-component';

import SelectCST from './SelectCST';
import SelectCFOP from './SelectCFOP';
import { useState } from "react";

export default function Tabela({ allData }) {

  
const columns = [
  {
      name: 'Chave',
    selector: row => row.chave,
    width: '370px',
    sortable: true,
    reorder: true,
  },
  {
      name: 'Nota Fiscal',
    selector: row => row.nNF,
    width: '110px',
    sortable: true,
    reorder: true,
  },
  {
      name: 'Data Emissão',
    selector: row => row.dataCompleta,
    width: '120px',
    sortable: true,
    reorder: true,
  },
  {
      name: 'Empresa',
      selector: row => row.empresa,
      width: '300px',
      sortable: true,
      reorder: true,
  },
  {
      name: 'Produto',
      selector: row => row.prod,
      width: '350px',
      sortable: true,
      reorder: true,
  },
  {
      name: 'CST',
      selector: row => row.cst,
      width: '80px',
      sortable: true,
      reorder: true,
  },
  {
      name: 'CFOP',
      selector: row => row.cfop,
      width: '100px',
      sortable: true,
      reorder: true,
  },
  {
      name: 'IPI',
      selector: row => row.ipi,
      width: '60px',
      reorder: true,
  },
  {
      name: 'Valor',
    selector: row => row.vProd,
    width: '100px',
    right: true,
    reorder: true,
  },
  {
      name: 'Desconto',
    selector: row => row.valorDesc,
    width: '100px',
    right: true,
    sortable: true,
    reorder: true,
  },
  {
      name: 'Outro',
    selector: row => row.valorOutro,
    width: '100px',
    right: true,
    sortable: true,
    reorder: true,
  },
  {
      name: 'Frete',
    selector: row => row.valorFrete,
    width: '80px',
    right: true,
    sortable: true,
    reorder: true,
  },
  {
      name: 'Aliquota',
    selector: row => row.valorAliquota,
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

  const somarAliquota = (item) => {
    var temp = 0;
    item.map((nota) => temp = temp + parseFloat(nota.valorAliquota))
    return temp
  }

  const rowsPerPageText = { rowsPerPageText: 'Linhas por Página:' }
  const [selectedCST, setSelectedCST] = useState([]);
  const [selectedCFOP, setSelectedCFOP] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState(allData);
  const [sumAliquota, setSumAliquota] = useState(somarAliquota(allData));

  const handleFilter = () => {
    const temp = allData.filter(
      item => (temCFOP(item) && temCST(item))
    ) 
    setDadosFiltrados(temp)
    setSumAliquota(somarAliquota(temp))
  }


  return (
    <div>
      <div className="centralizarFiltros">
      <div className='filtros'>
          <h1>Filtros da Tabela</h1>
        <div className='camposFiltros'>
        <SelectCST allData={allData} setSelectedCST={setSelectedCST} />
      <SelectCFOP allData={allData} setSelectedCFOP={ setSelectedCFOP} />
      </div>
          <div className="alinharDireita">
          <button onClick={handleFilter}>Atualizar  Tabela</button>
      </div>
        </div>
        <div className="somaAliquota">
          <h1>Somatório Alíquota</h1>
          <h1>{ sumAliquota}</h1>
        </div>
      </div>
      <DataTable
          columns={columns}
        data={dadosFiltrados}
        dense
        pagination
        highlightOnHover
        striped
        pointerOnHover
        paginationRowsPerPageOptions={[10, 25, 50, 200, 200]}
          paginationComponentOptions={rowsPerPageText}
      />
      </div>
      );
}