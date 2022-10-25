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
  Plan,
  Suscripcion,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanSuscripcionController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/suscripcion', {
    responses: {
      '200': {
        description: 'Plan has one Suscripcion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Suscripcion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Suscripcion>,
  ): Promise<Suscripcion> {
    return this.planRepository.suscripcion(id).get(filter);
  }

  @post('/plans/{id}/suscripcion', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Suscripcion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suscripcion, {
            title: 'NewSuscripcionInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) suscripcion: Omit<Suscripcion, 'id'>,
  ): Promise<Suscripcion> {
    return this.planRepository.suscripcion(id).create(suscripcion);
  }

  @patch('/plans/{id}/suscripcion', {
    responses: {
      '200': {
        description: 'Plan.Suscripcion PATCH success count',
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
    return this.planRepository.suscripcion(id).patch(suscripcion, where);
  }

  @del('/plans/{id}/suscripcion', {
    responses: {
      '200': {
        description: 'Plan.Suscripcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Suscripcion)) where?: Where<Suscripcion>,
  ): Promise<Count> {
    return this.planRepository.suscripcion(id).delete(where);
  }
}
