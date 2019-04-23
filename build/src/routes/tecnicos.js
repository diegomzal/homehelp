"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const tecnicoController_1 = require("../controllers/tecnicoController");
router.get('/', tecnicoController_1.tecnicoController.index);
router.get('/add', tecnicoController_1.tecnicoController.renderFormTecnico);
router.post('/add', tecnicoController_1.tecnicoController.saveTecnico);
exports.default = router;
