import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ImportarXMLNFe from './pages/ImportarXMLNFe'
import ImportarXMLCFe from './pages/ImportarXMLCFe'
import ImportarTXTSped from './pages/ImportarTXTSped'
import AreaDeImportacao from './pages/AreaDeImportacao'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ImportarXMLNFe />} />
        <Route path="/" element={<ImportarXMLNFe />}/>
        <Route path="importarxmlnfe" element={<AreaDeImportacao />}>
          <Route path="xmlnfe" element={<ImportarXMLNFe />} />
          <Route path="xmlcfe" element={<ImportarXMLCFe />}/> 
          <Route path="txtsped" element={<ImportarTXTSped />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App