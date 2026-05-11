const express = require('express');
const app = express();
const port = 3000;

// Middleware para leer JSON
app.use(express.json());

// Importar nuestras rutas
const ticketsRoutes = require('./routes/ticketsRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');

console.log("Tickets es:", typeof ticketsRoutes);
console.log("Empleados es:", typeof empleadosRoutes);

// Usar las rutas (Aquí definimos la URL principal para cada archivo)
app.use('/tickets_soporte', ticketsRoutes);
app.use('/empleados_rrhh', empleadosRoutes);

// Inicialización del servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});