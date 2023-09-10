import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Testando from './pages/Testando'
import ImportarXMLNFe from './pages/ImportarXMLNFe'
import AreaDeImportacao from './pages/AreaDeImportacao'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Testando />} />
        <Route path="/" element={<Testando />}/>
        <Route path="importarxmlnfe" element={<AreaDeImportacao />}>
          <Route path="xmlnfe" element={<ImportarXMLNFe />} />
          <Route path="xmlcfe" element={<Testando />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App