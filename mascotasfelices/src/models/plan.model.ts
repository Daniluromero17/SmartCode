import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Suscripcion} from './suscripcion.model';

@model()
export class Plan extends Entity {
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
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @property({
    type: 'string',
  })
  suscripcionId?: string;

  @hasOne(() => Suscripcion)
  suscripcion: Suscripcion;

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
