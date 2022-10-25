import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Credenciales} from '../models';
import {CredencialesRepository} from '../repositories';

export class CredencialesController {
  constructor(
    @repository(CredencialesRepository)
    public credencialesRepository : CredencialesRepository,
  ) {}

  @post('/credenciales')
  @response(200, {
    description: 'Credenciales model instance',
    content: {'application/json': {schema: getModelSchemaRef(Credenciales)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {
            title: 'NewCredenciales',
            exclude: ['id'],
          }),
        },
      },
    })
    credenciales: Omit<Credenciales, 'id'>,
  ): Promise<Credenciales> {
    return this.credencialesRepository.create(credenciales);
  }

  @get('/credenciales/count')
  @response(200, {
    description: 'Credenciales model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Credenciales) where?: Where<Credenciales>,
  ): Promise<Count> {
    return this.credencialesRepository.count(where);
  }

  @get('/credenciales')
  @response(200, {
    description: 'Array of Credenciales model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Credenciales, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Credenciales) filter?: Filter<Credenciales>,
  ): Promise<Credenciales[]> {
    return this.credencialesRepository.find(filter);
  }

  @patch('/credenciales')
  @response(200, {
    description: 'Credenciales PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {partial: true}),
        },
      },
    })
    credenciales: Credenciales,
    @param.where(Credenciales) where?: Where<Credenciales>,
  ): Promise<Count> {
    return this.credencialesRepository.updateAll(credenciales, where);
  }

  @get('/credenciales/{id}')
  @response(200, {
    description: 'Credenciales model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Credenciales, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Credenciales, {exclude: 'where'}) filter?: FilterExcludingWhere<Credenciales>
  ): Promise<Credenciales> {
    return this.credencialesRepository.findById(id, filter);
  }

  @patch('/credenciales/{id}')
  @response(204, {
    description: 'Credenciales PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {partial: true}),
        },
      },
    })
    credenciales: Credenciales,
  ): Promise<void> {
    await this.credencialesRepository.updateById(id, credenciales);
  }

  @put('/credenciales/{id}')
  @response(204, {
    description: 'Credenciales PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() credenciales: Credenciales,
  ): Promise<void> {
    await this.credencialesRepository.replaceById(id, credenciales);
  }

  @del('/credenciales/{id}')
  @response(204, {
    description: 'Credenciales DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.credencialesRepository.deleteById(id);
  }
}
