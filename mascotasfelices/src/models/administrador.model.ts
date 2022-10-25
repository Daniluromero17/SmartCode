import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Credenciales} from './credenciales.model';

@model()
export class Administrador extends Entity {
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
  tipo: string;

  @belongsTo(() => Persona)
  personaId: string;

  @hasOne(() => Credenciales)
  credenciales: Credenciales;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
