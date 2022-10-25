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
  Plan,
} from '../models';
import {SuscripcionRepository} from '../repositories';

export class SuscripcionPlanController {
  constructor(
    @repository(SuscripcionRepository) protected suscripcionRepository: SuscripcionRepository,
  ) { }

  @get('/suscripcions/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Suscripcion has many Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.suscripcionRepository.planes(id).find(filter);
  }

  @post('/suscripcions/{id}/plans', {
    responses: {
      '200': {
        description: 'Suscripcion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Suscripcion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInSuscripcion',
            exclude: ['id'],
            optional: ['suscripcionId']
          }),
        },
      },
    }) plan: Omit<Plan, 'id'>,
  ): Promise<Plan> {
    return this.suscripcionRepository.planes(id).create(plan);
  }

  @patch('/suscripcions/{id}/plans', {
    responses: {
      '200': {
        description: 'Suscripcion.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.suscripcionRepository.planes(id).patch(plan, where);
  }

  @del('/suscripcions/{id}/plans', {
    responses: {
      '200': {
        description: 'Suscripcion.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.suscripcionRepository.planes(id).delete(where);
  }
}
