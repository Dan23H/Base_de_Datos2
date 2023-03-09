import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Registro de personas</h1>
      <form method="POST" action="/registro">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />
        <br />
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" name="telefono" required />
        <br />
        <label for="fecha_nacimiento">Fecha de nacimiento:</label>
        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required />
        <br />
        <input type="submit" value="Registrar" />
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
