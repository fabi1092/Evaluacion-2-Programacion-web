const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

router.get('/', empleadosController.listarEmpleados);
router.get('/:id', empleadosController.obtenerEmpleadoPorId);
router.post('/', empleadosController.crearEmpleado);
router.put('/:id', empleadosController.actualizarEmpleado);
router.delete('/:id', empleadosController.eliminarEmpleado);

module.exports = router;