# Base_de_Datos2
Este repositorio es para talleres y tareas de Bases de Datos 2... No confundir con el repositorio del proyecto.

Juan José Saavedra Realpe (2210120)
Daniel Hernandez Valderrama (2210235)

PASOS A SEGUIR:
1) Abrir Docker
2) Abrir el CMD y digitar "docker run -d --name practica-redis -p 6379:6379 redis/redis-stack-server".
Esto deberia crearle un contenedor llamado "practica-redis".
3) Abra el programa en Visual Studio Code, cree una nueva terminal para ese archivo y digite "npm start".
Al hacer esto le aparecera un mensaje con el link al que debe entrar.
4) Llene lo espacios que aparecen (Nombre, email, telefono y fecha de nacimiento) y presione registrar.
5) Vuelva al CMD y ponga el comando "docker exec -it practica-redis redis-cli".
6) Ponga el comando "KEYS *" para ver las llaves que tienen guardadas (representadas con el email de las personas).
7) Ponga "HGETALL <Nombre de la llave>" para ver los datos de la persona.
