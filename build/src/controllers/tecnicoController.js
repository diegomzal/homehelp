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
const Tecnico_1 = __importDefault(require("../models/Tecnico"));
class TecnicoController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tecnicos = yield Tecnico_1.default.find();
            res.render('tecnicos/index', {
                title: 'Tecnico',
                tecnicos
            });
        });
    }
    renderFormTecnico(req, res) {
        res.render('tecnicos/add', {
            title: 'Registrar Tecnico'
        });
    }
    saveTecnico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, pass, nombre, apellido, telefono, correo, dni, direccion, especialidad } = req.body;
            const tecnico = new Tecnico_1.default({ user, pass, nombre, apellido, telefono, correo, dni, direccion, especialidad });
            yield tecnico.save();
            res.redirect('/tecnicos');
        });
    }
}
exports.tecnicoController = new TecnicoController();
