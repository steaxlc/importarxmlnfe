import React, { useRef, useState } from 'react'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

function InputTXT(props) {
  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleOnDrop = (event) => {
    event.preventDefault();
    props.setFiles(event.dataTransfer.files);
  }

  const inputRef = useRef();

  const [esquerda, setEsquerda] = useState(false)

  return (
    <div className='UploadCard'>
      <h1>Selecionar Arquivo {props.title }</h1>
      <div className="UploadButton"
        onDragOver={ handleDragOver}
        onDrop={handleOnDrop}>
        <DriveFolderUploadIcon sx={{ color: "#3D1A78", fontSize: 40 }} />
        <h3>Arraste e solte o arquivo aqui</h3>
        <h4>ou</h4>
      <button onClick={()=>inputRef.current.click()}
        ><h3>Selecionar Arquivo</h3>
      <input
        type="file"
        accept='.txt'
            hidden
            ref={inputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            props.setFiles(e.target.files);
            setEsquerda(true)
          }
        }}
      />
        </button>
      
        <p>Arquivo suportado: TXT</p>
      </div>
    </div>
  )
}

export default InputTXT