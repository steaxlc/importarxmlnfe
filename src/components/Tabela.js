import DataTable from 'react-data-table-component';

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
  
  const rowsPerPageText = { rowsPerPageText: 'Linhas por Página:' }

    return (
      <DataTable
          columns={columns}
        data={allData}
        dense
        pagination
        highlightOnHover
        striped
        pointerOnHover
        paginationRowsPerPageOptions={[10, 25, 50, 200, 200]}
          paginationComponentOptions={rowsPerPageText}
      />
  );
}