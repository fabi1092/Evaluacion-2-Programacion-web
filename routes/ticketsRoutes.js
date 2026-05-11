const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

router.get('/', ticketsController.listarTickets);
router.get('/:id', ticketsController.obtenerTicketPorId);
router.post('/', ticketsController.crearTicket);
router.put('/:id', ticketsController.actualizarTicket);
router.delete('/:id', ticketsController.eliminarTicket);

module.exports = router; 