import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Cliente} from './cliente.model';
import {Asesor} from './asesor.model';

@model()
export class Credenciales extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;
  @belongsTo(() => Administrador)
  administradorId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<Credenciales>) {
    super(data);
  }
}

export interface CredencialesRelations {
  // describe navigational properties here
}

export type CredencialesWithRelations = Credenciales & CredencialesRelations;
