const db = require('../db');

const listarTickets = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tickets_soporte');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const obtenerTicketPorId = async (req, res) => {
    try {
        var id = req.params.id;
        const query = 'SELECT * FROM tickets_soporte where id = ?';
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const crearTicket = async (req, res) => {
    const { asunto, descripcion, prioridad, fecha_creacion, estado, canal } = req.body; 
    
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
};

const actualizarTicket = async (req, res) => {
    var id = req.params.id;
    const { asunto, descripcion, prioridad, fecha_creacion, estado, canal } = req.body; 
    
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
};

const eliminarTicket = async (req, res) => {
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
};

module.exports = { listarTickets, obtenerTicketPorId, crearTicket, actualizarTicket, eliminarTicket };