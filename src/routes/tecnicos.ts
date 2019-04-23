import { Router } from 'express';

const router : Router = Router();

import { tecnicoController } from '../controllers/tecnicoController';

router.get('/', tecnicoController.index);
router.get('/add', tecnicoController.renderFormTecnico);
router.post('/add', tecnicoController.saveTecnico)

export default router;