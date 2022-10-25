import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Servicio,
  Suscripcion,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioSuscripcionController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/suscripcions', {
    responses: {
      '200': {
        description: 'Array of Servicio has many Suscripcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Suscripcion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Suscripcion>,
  ): Promise<Suscripcion[]> {
    return this.servicioRepository.suscripcions(id).find(filter);
  }

  @post('/servicios/{id}/suscripcions', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Suscripcion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suscripcion, {
            title: 'NewSuscripcionInServicio',
            exclude: ['id'],
            optional: ['servicioId']
          }),
        },
      },
    }) suscripcion: Omit<Suscripcion, 'id'>,
  ): Promise<Suscripcion> {
    return this.servicioRepository.suscripcions(id).create(suscripcion);
  }

  @patch('/servicios/{id}/suscripcions', {
    responses: {
      '200': {
        description: 'Servicio.Suscripcion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suscripcion, {partial: true}),
        },
      },
    })
    suscripcion: Partial<Suscripcion>,
    @param.query.object('where', getWhereSchemaFor(Suscripcion)) where?: Where<Suscripcion>,
  ): Promise<Count> {
    return this.servicioRepository.suscripcions(id).patch(suscripcion, where);
  }

  @del('/servicios/{id}/suscripcions', {
    responses: {
      '200': {
        description: 'Servicio.Suscripcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Suscripcion)) where?: Where<Suscripcion>,
  ): Promise<Count> {
    return this.servicioRepository.suscripcions(id).delete(where);
  }
}
