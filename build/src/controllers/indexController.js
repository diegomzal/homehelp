"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.render('index', { title: 'Bienvenido a HOMEHELP' });
    }
}
exports.indexController = new IndexController();
