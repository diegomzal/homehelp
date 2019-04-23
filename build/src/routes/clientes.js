"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const clienteController_1 = require("../controllers/clienteController");
router.get('/', clienteController_1.clienteController.index);
router.get('/add', clienteController_1.clienteController.renderFormCliente);
router.post('/add', clienteController_1.clienteController.saveCliente);
exports.default = router;
