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
  Administrador,
  Credenciales,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorCredencialesController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Administrador has one Credenciales',
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
    return this.administradorRepository.credenciales(id).get(filter);
  }

  @post('/administradors/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Credenciales)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {
            title: 'NewCredencialesInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) credenciales: Omit<Credenciales, 'id'>,
  ): Promise<Credenciales> {
    return this.administradorRepository.credenciales(id).create(credenciales);
  }

  @patch('/administradors/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Administrador.Credenciales PATCH success count',
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
    return this.administradorRepository.credenciales(id).patch(credenciales, where);
  }

  @del('/administradors/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Administrador.Credenciales DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Credenciales)) where?: Where<Credenciales>,
  ): Promise<Count> {
    return this.administradorRepository.credenciales(id).delete(where);
  }
}
