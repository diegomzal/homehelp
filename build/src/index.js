"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
// Importing Routes
const routes_1 = __importDefault(require("./routes"));
const clientes_1 = __importDefault(require("./routes/clientes"));
const tecnicos_1 = __importDefault(require("./routes/tecnicos"));
// Inicializaciones
const app = express_1.default();
require("./database");
// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('.hbs', express_handlebars_1.default({
    extname: '.hbs',
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers'),
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Rutas
app.use('/', routes_1.default);
app.use('/clientes', clientes_1.default);
app.use('/tecnicos', tecnicos_1.default);
// Archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
});
