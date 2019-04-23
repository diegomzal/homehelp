import { Request, Response } from 'express';
import ClienteModel, { Cliente } from '../models/Cliente';

class ClienteController{

    public async index (req: Request, res: Response): Promise<void> {
        const clientes: Cliente[] = await ClienteModel.find();
        res.render('clientes/index', {
            title: 'Cliente',
            clientes
        })
    }

    public renderFormCliente (req: Request, res: Response): void {
        res.render('clientes/add', {
            title: 'Registrar Cliente'
        })
    }

    public async saveCliente (req: Request, res: Response) {
        const { user, pass, nombre, apellido, telefono, correo, dni, direccion } = req.body
        const cliente: Cliente = new ClienteModel({user, pass, nombre, apellido, telefono, correo, dni, direccion});
        await cliente.save();
        res.redirect('/clientes');
    }

}

export const clienteController = new ClienteController();