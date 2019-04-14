import { Router } from 'express';

const router : Router = Router();

import { clienteController } from '../controllers/clienteController';

router.get('/', clienteController.index);
router.get('/add', clienteController.renderFormCliente);
router.post('/add', clienteController.saveCliente)

export default router;