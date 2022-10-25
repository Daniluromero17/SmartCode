import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Pedidos} from './pedidos.model';
import {Mascota} from './mascota.model';
import {Plan} from './plan.model';
import {Credenciales} from './credenciales.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fehaNacimiento: string;

  @belongsTo(() => Persona)
  personaId: string;

  @hasMany(() => Pedidos)
  pedidos: Pedidos[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasOne(() => Plan)
  plan: Plan;

  @hasOne(() => Credenciales)
  credenciales: Credenciales;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
