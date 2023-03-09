import { useState } from "react"

function App() {
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [tel,setTel] = useState('')
  const [birth,setBirth] = useState('')

  handleEmail = (evt) => {

  }

  handleNombre = (evt) => {

  }

  handleTel = (evt) => {

  }

  handleBirth = (evt) => {
    
  }


  return (
    <div className="App">
      <h1>Registro de personas</h1>
      <form method="POST" action="/registro">
        <label for="email">Email:</label>
        <input type="email" onChange={(event) => handleEmail(event)} required />
        <br />
        <label for="nombre">Nombre:</label>
        <input type="text" onChange={(event) => handleNombre(event)} required />
        <br />
        <label for="telefono">Teléfono:</label>
        <input type="tel" onChange={(event) => handleTel(event)} required />
        <br />
        <label for="fecha_nacimiento">Fecha de nacimiento:</label>
        <input type="date" onChange={(event) => handleBirth(event)} required />
        <br />
        <input type="submit" onSubmit={() => {}} value="Registrar" />
      </form>
      <br />
      <hr />
      <h1>Búsqueda de personas</h1>
      <form method="GET" action="/busqueda">
        <label for="email_busqueda">Email:</label>
        <input type="email" id="email_busqueda" name="email" required /><br />
        <input type="submit" value="Buscar" />
      </form>
    </div>
  )

}

export default App
