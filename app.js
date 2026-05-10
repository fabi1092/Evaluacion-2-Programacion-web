const express = require('express')
const db = require('./db');
const app = express()
const port = 3000

app.use(express.json());


// 1. ENDPOINTS PARA: tickets_soporte


app.get('/tickets_soporte', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tickets_soporte');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/tickets_soporte/:id', async (req, res) => {
    try {
        var id = req.params.id;
        const query = 'SELECT * FROM tickets_soporte where id = ?'
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/tickets_soporte', async (req, res) => {
    const { asunto, descripcion, prioridad, fecha_creacion, estado, canal } = req.body; 
    
    // Validación básica
    if (!asunto || !descripcion || !prioridad || !fecha_creacion || !estado || !canal) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        const query = 'INSERT INTO tickets_soporte (asunto, descripcion, prioridad, fecha_creacion, estado, canal) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [asunto, descripcion, prioridad, fecha_creacion, estado, canal]);
        res.status(201).json({
            mensaje: 'Ticket guardado con éxito',
            id: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
})

app.put('/tickets_soporte/:id', async (req, res) => {
    var id = req.params.id;
    const { asunto, descripcion, prioridad, fecha_creacion, estado, canal } = req.body; 
    
    // Validación básica
    if (!asunto || !descripcion || !prioridad || !fecha_creacion || !estado || !canal) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        const query = 'UPDATE tickets_soporte SET asunto=?, descripcion=?, prioridad=?, fecha_creacion=?, estado=?, canal=? where id = ?';
        const [result] = await db.query(query, [asunto, descripcion, prioridad, fecha_creacion, estado, canal, id]);
        res.status(201).json({
            mensaje: 'Ticket actualizado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar en la base de datos' });
    }
})

app.delete('/tickets_soporte/:id', async (req, res) => {
    var id = req.params.id;
    try {
        const query = 'DELETE FROM tickets_soporte WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.status(201).json({
            mensaje: 'Ticket eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar en la base de datos' });
    }
})


// 2. ENDPOINTS PARA: empleados_rrhh


app.get('/empleados_rrhh', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM empleados_rrhh');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/empleados_rrhh/:id', async (req, res) => {
    try {
        var id = req.params.id;
        const query = 'SELECT * FROM empleados_rrhh where id = ?'
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/empleados_rrhh', async (req, res) => {
    const { nombres, cargo, salario, fecha_ingreso, departamento, contrato_activo } = req.body; 
    
    // Validación (se usa !== undefined para el booleano por si envían un false)
    if (!nombres || !cargo || !salario || !fecha_ingreso || !departamento || contrato_activo === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        const query = 'INSERT INTO empleados_rrhh (nombres, cargo, salario, fecha_ingreso, departamento, contrato_activo) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [nombres, cargo, salario, fecha_ingreso, departamento, contrato_activo]);
        res.status(201).json({
            mensaje: 'Empleado guardado con éxito',
            id: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
})

app.put('/empleados_rrhh/:id', async (req, res) => {
    var id = req.params.id;
    const { nombres, cargo, salario, fecha_ingreso, departamento, contrato_activo } = req.body; 
    
    // Validación básica
    if (!nombres || !cargo || !salario || !fecha_ingreso || !departamento || contrato_activo === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        const query = 'UPDATE empleados_rrhh SET nombres=?, cargo=?, salario=?, fecha_ingreso=?, departamento=?, contrato_activo=? where id = ?';
        const [result] = await db.query(query, [nombres, cargo, salario, fecha_ingreso, departamento, contrato_activo, id]);
        res.status(201).json({
            mensaje: 'Empleado actualizado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar en la base de datos' });
    }
})

app.delete('/empleados_rrhh/:id', async (req, res) => {
    var id = req.params.id;
    try {
        const query = 'DELETE FROM empleados_rrhh WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.status(201).json({
            mensaje: 'Empleado eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar en la base de datos' });
    }
})


// INICIALIZACIÓN DEL SERVIDOR


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})