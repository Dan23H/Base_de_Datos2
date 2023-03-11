const express = require("express");
const redis = require("redis");
const path = require("path");

const client = redis.createClient();
const app = express();
const port = 3000;

client.on("error", (err) => {
  console.log("Error in the Connection", err);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/interaccion.js", (req, res) => {
  res.sendFile(path.join(__dirname, "interaccion.js"));
});

app.post("/addprofile", (req, res) => {
  const { email, name, tel, birth } = req.body;
  client
    .HSET(email, { name, tel, birth })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
app.get("/profile/:email", (req, res) => {
  const email = req.params.email;
  client.hGetAll(email, (err, obj) => {
    if (!obj) {
      res.status(404).send("Profile not found");
    } else {
      res.send(obj);
    }
  });
});
client.connect();
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
