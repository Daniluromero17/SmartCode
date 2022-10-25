import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Productos} from './productos.model';

@model()
export class Pedidos extends Entity {
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
  fechaPedido: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  valorTotal: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Productos)
  productos: Productos[];

  @property({
    type: 'string',
  })
  productosId?: string;

  constructor(data?: Partial<Pedidos>) {
    super(data);
  }
}

export interface PedidosRelations {
  // describe navigational properties here
}

export type PedidosWithRelations = Pedidos & PedidosRelations;
