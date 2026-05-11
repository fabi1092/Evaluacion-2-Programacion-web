const db = require('../db'); // Subimos un nivel con '../' para encontrar db.js

const listarEmpleados = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM empleados_rrhh');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const obtenerEmpleadoPorId = async (req, res) => {
    try {
        var id = req.params.id;
        const query = 'SELECT * FROM empleados_rrhh where id = ?';
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const crearEmpleado = async (req, res) => {
    const { nombres, cargo, salario, fecha_ingreso, departamento, contrato_activo } = req.body; 
    
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
};

const actualizarEmpleado = async (req, res) => {
    var id = req.params.id;
    const { nombres, cargo, salario, fecha_ingreso, departamento, contrato_activo } = req.body; 
    
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
};

const eliminarEmpleado = async (req, res) => {
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
};

// Exportamos todas las funciones
module.exports = { listarEmpleados, obtenerEmpleadoPorId, crearEmpleado, actualizarEmpleado, eliminarEmpleado };