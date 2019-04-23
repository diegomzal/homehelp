"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../models/Cliente"));
class ClienteController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientes = yield Cliente_1.default.find();
            res.render('clientes/index', {
                title: 'Cliente',
                clientes
            });
        });
    }
    renderFormCliente(req, res) {
        res.render('clientes/add', {
            title: 'Registrar Cliente'
        });
    }
    saveCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, pass, nombre, apellido, telefono, correo, dni, direccion } = req.body;
            const cliente = new Cliente_1.default({ user, pass, nombre, apellido, telefono, correo, dni, direccion });
            yield cliente.save();
            res.redirect('/clientes');
        });
    }
}
exports.clienteController = new ClienteController();
