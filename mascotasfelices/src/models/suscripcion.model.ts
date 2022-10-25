import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plan} from './plan.model';
import {Servicio} from './servicio.model';

@model()
export class Suscripcion extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFin: string;

  @hasMany(() => Plan)
  planes: Plan[];

  @property({
    type: 'string',
  })
  planId?: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  @property({
    type: 'string',
  })
  servicioId?: string;

  constructor(data?: Partial<Suscripcion>) {
    super(data);
  }
}

export interface SuscripcionRelations {
  // describe navigational properties here
}

export type SuscripcionWithRelations = Suscripcion & SuscripcionRelations;
