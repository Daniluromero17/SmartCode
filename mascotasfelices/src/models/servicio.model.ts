import {Entity, model, property, hasMany} from '@loopback/repository';
import {Suscripcion} from './suscripcion.model';

@model()
export class Servicio extends Entity {
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
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  proveedor: string[];

  @property({
    type: 'string',
  })
  suscripcionId?: string;

  @hasMany(() => Suscripcion)
  suscripcions: Suscripcion[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
