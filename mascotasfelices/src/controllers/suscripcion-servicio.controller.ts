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
  Suscripcion,
  Servicio,
} from '../models';
import {SuscripcionRepository} from '../repositories';

export class SuscripcionServicioController {
  constructor(
    @repository(SuscripcionRepository) protected suscripcionRepository: SuscripcionRepository,
  ) { }

  @get('/suscripcions/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Suscripcion has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.suscripcionRepository.servicios(id).find(filter);
  }

  @post('/suscripcions/{id}/servicios', {
    responses: {
      '200': {
        description: 'Suscripcion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Suscripcion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInSuscripcion',
            exclude: ['id'],
            optional: ['suscripcionId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.suscripcionRepository.servicios(id).create(servicio);
  }

  @patch('/suscripcions/{id}/servicios', {
    responses: {
      '200': {
        description: 'Suscripcion.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.suscripcionRepository.servicios(id).patch(servicio, where);
  }

  @del('/suscripcions/{id}/servicios', {
    responses: {
      '200': {
        description: 'Suscripcion.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.suscripcionRepository.servicios(id).delete(where);
  }
}
