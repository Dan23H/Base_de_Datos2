import { useState } from "react"

function App() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [tel, setTel] = useState('')
  const [birth, setBirth] = useState('')
  const [showSearchForm, setShowSearchForm] = useState(false)

  const handleEmail = (evt) => {
    evt.preventDefault()
    setEmail(evt.target.value)
  }

  const handleNombre = (evt) => {
    evt.preventDefault()
    setName(evt.target.value)
  }

  const handleTel = (evt) => {
    evt.preventDefault()
    setTel(evt.target.value)
  }

  const handleBirth = (evt) => {
    evt.preventDefault()
    setBirth(evt.target.value)
  }

  const handleSearch = (evt) => {
    evt.preventDefault()
    setShowSearchForm(true) // Para mostrar el formulario de búsqueda
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch('/perfil', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, tel, birth, email })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="App">
      {showSearchForm ? (
        <>
          <h1>Búsqueda de personas</h1>
          <form method="GET" action="/busqueda">
            <table>
              <tr>
                <td>
                  <label for="email_busqueda">Email: </label>
                </td>
                <td>
                  <input type="email" onChange={(event) => handleSearch(event)} required />
                </td>
              </tr>
            </table>
            <input type="submit" value="Buscar" />
          </form>
        </>
      ) : (
        <>
          <h1>Registro de personas</h1>
          <form method="POST" action="/perfil" onSubmit={(event) => handleSubmit(event)}>
            <table>
              <tr>
                <td>
                  <label for="email">Email: </label>
                </td>
                <td>
                  <input type="email" onChange={(event) => handleEmail(event)} required />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="nombre">Nombre: </label>
                </td>
                <td>
                  <input type="text" onChange={(event) => handleNombre(event)} required />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="telefono">Teléfono: </label>
                </td>
                <td>
                  <input type="tel" onChange={(event) => handleTel(event)} required />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="fecha_nacimiento">Fecha de nacimiento: </label>
                </td>
                <td>
                  <input type="date" onChange={(event) => handleBirth(event)} required />
                </td>
              </tr>
            </table>
            <input type="submit" name="submit" value="Registrar" />
          </form>
          <br />
          <hr />
        </>
      )
      }
    </div>
  )

}

export default App

const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Crea un cliente Redis
const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379
})

// Agrega el middleware bodyParser para analizar los datos del formulario
app.use(bodyParser.json());

// Maneja la solicitud POST para guardar un perfil
app.post('/perfil', (req, res) => {
  const { name, tel, birth, email } = req.body;

  // Guarda los datos del perfil en Redis
  redisClient.hmset(email, 'datos', JSON.stringify({name, tel, birth}), (err, reply) => {
    if (err) {
      res.status(500).json({ message: 'Error al guardar el perfil.' });
    } else {
      res.json({ message: 'Perfil guardado exitosamente.' });
    }
  });
});

// Maneja la solicitud GET para mostrar el formulario HTML
app.get('/formulario', (req, res) => {
  res.sendFile();
});

// Maneja la solicitud GET para buscar un perfil por email
app.get('/perfil/:email', (req, res) => {
  const { email } = req.params;

  // Busca los datos del perfil en Redis
  redisClient.hgetall(email, (err, reply) => {
    if (err) {
      res.status(500).json({ message: 'Error al buscar el perfil.' });
    } else if (!reply || !reply.datos) {
      res.status(404).json({ message: 'Perfil no encontrado.' });
    } else {
      const perfil = {
        nombre: reply.nombre,
        telefono: reply.telefono,
        fecha_nacimiento: reply.fecha_nacimiento,
        email: email
      };
      res.json(perfil);
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});