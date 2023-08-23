import React, { useRef } from 'react'
import Button from '@mui/material/Button';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

function InputXML(props) {
  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleOnDrop = (event) => {
    event.preventDefault();
    props.setFiles(event.dataTransfer.files);
  }

  const inputRef = useRef();

  return (
    <div className='UploadCard'>
      <h1>Selecionar Arquivos</h1>
      <div className="UploadButton"
        onDragOver={ handleDragOver}
        onDrop={handleOnDrop}>
        <DriveFolderUploadIcon sx={{ color: "#3D1A78", fontSize: 40 }} />
        <h3>Arraste e solte os arquivos aqui</h3>
        <h4>ou</h4>
      <button onClick={()=>inputRef.current.click()}
        ><h3>Selecionar Arquivo</h3>
      <input
        type="file"
        accept='application/xml'
          multiple
            hidden
            ref={inputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            props.setFiles(e.target.files);
          }
        }}
      />
        </button>
      
        <p>Arquivos suportados: XML</p>
      </div>
    </div>
  )
}

export default InputXML