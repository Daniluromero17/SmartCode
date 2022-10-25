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
  Asesor,
  Credenciales,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorCredencialesController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Asesor has one Credenciales',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credenciales),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Credenciales>,
  ): Promise<Credenciales> {
    return this.asesorRepository.credenciales(id).get(filter);
  }

  @post('/asesors/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Credenciales)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {
            title: 'NewCredencialesInAsesor',
            exclude: ['id'],
            optional: ['asesorId']
          }),
        },
      },
    }) credenciales: Omit<Credenciales, 'id'>,
  ): Promise<Credenciales> {
    return this.asesorRepository.credenciales(id).create(credenciales);
  }

  @patch('/asesors/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Asesor.Credenciales PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {partial: true}),
        },
      },
    })
    credenciales: Partial<Credenciales>,
    @param.query.object('where', getWhereSchemaFor(Credenciales)) where?: Where<Credenciales>,
  ): Promise<Count> {
    return this.asesorRepository.credenciales(id).patch(credenciales, where);
  }

  @del('/asesors/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Asesor.Credenciales DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Credenciales)) where?: Where<Credenciales>,
  ): Promise<Count> {
    return this.asesorRepository.credenciales(id).delete(where);
  }
}
