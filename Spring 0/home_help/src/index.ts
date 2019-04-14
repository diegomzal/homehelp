import express from 'express';
import exphbs from 'express-handlebars'
import path from 'path';

// Importing Routes
import IndexRoutes from './routes';
import ClienteRoutes from './routes/clientes';
import TecnicoRoutes from './routes/tecnicos';

// Inicializaciones
const app = express();
import './database'

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers'),
    defaultLayout: 'main'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Rutas
app.use('/', IndexRoutes);
app.use('/clientes', ClienteRoutes);
app.use('/tecnicos', TecnicoRoutes);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
})