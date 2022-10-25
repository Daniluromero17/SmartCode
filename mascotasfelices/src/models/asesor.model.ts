import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Credenciales} from './credenciales.model';

@model()
export class Asesor extends Entity {
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

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
