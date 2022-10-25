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
  Cliente,
  Credenciales,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteCredencialesController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Cliente has one Credenciales',
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
    return this.clienteRepository.credenciales(id).get(filter);
  }

  @post('/clientes/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Credenciales)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {
            title: 'NewCredencialesInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) credenciales: Omit<Credenciales, 'id'>,
  ): Promise<Credenciales> {
    return this.clienteRepository.credenciales(id).create(credenciales);
  }

  @patch('/clientes/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Cliente.Credenciales PATCH success count',
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
    return this.clienteRepository.credenciales(id).patch(credenciales, where);
  }

  @del('/clientes/{id}/credenciales', {
    responses: {
      '200': {
        description: 'Cliente.Credenciales DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Credenciales)) where?: Where<Credenciales>,
  ): Promise<Count> {
    return this.clienteRepository.credenciales(id).delete(where);
  }
}
