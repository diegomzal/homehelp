import { Request, Response } from 'express';
import TecnicoModel, { Tecnico } from '../models/Tecnico';

class TecnicoController{

    public async index (req: Request, res: Response): Promise<void> {
        const tecnicos: Tecnico[] = await TecnicoModel.find();
        res.render('tecnicos/index', {
            title: 'Tecnico',
            tecnicos
        })
    }

    public renderFormTecnico (req: Request, res: Response): void {
        res.render('tecnicos/add', {
            title: 'Registrar Tecnico'
        })
    }

    public async saveTecnico (req: Request, res: Response) {
        const { user, pass, nombre, apellido, telefono, correo, dni, direccion, especialidad } = req.body
        const tecnico: Tecnico = new TecnicoModel({user, pass, nombre, apellido, telefono, correo, dni, direccion, especialidad});
        await tecnico.save();
        res.redirect('/tecnicos');
    }

}

export const tecnicoController = new TecnicoController();