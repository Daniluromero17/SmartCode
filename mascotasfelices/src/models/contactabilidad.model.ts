import {Entity, model, property} from '@loopback/repository';

@model()
export class Contactabilidad extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<Contactabilidad>) {
    super(data);
  }
}

export interface ContactabilidadRelations {
  // describe navigational properties here
}

export type ContactabilidadWithRelations = Contactabilidad & ContactabilidadRelations;
