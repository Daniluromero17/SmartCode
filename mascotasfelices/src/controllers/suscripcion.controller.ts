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
import {Suscripcion} from '../models';
import {SuscripcionRepository} from '../repositories';

export class SuscripcionController {
  constructor(
    @repository(SuscripcionRepository)
    public suscripcionRepository : SuscripcionRepository,
  ) {}

  @post('/suscripcions')
  @response(200, {
    description: 'Suscripcion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Suscripcion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suscripcion, {
            title: 'NewSuscripcion',
            exclude: ['id'],
          }),
        },
      },
    })
    suscripcion: Omit<Suscripcion, 'id'>,
  ): Promise<Suscripcion> {
    return this.suscripcionRepository.create(suscripcion);
  }

  @get('/suscripcions/count')
  @response(200, {
    description: 'Suscripcion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Suscripcion) where?: Where<Suscripcion>,
  ): Promise<Count> {
    return this.suscripcionRepository.count(where);
  }

  @get('/suscripcions')
  @response(200, {
    description: 'Array of Suscripcion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Suscripcion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Suscripcion) filter?: Filter<Suscripcion>,
  ): Promise<Suscripcion[]> {
    return this.suscripcionRepository.find(filter);
  }

  @patch('/suscripcions')
  @response(200, {
    description: 'Suscripcion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suscripcion, {partial: true}),
        },
      },
    })
    suscripcion: Suscripcion,
    @param.where(Suscripcion) where?: Where<Suscripcion>,
  ): Promise<Count> {
    return this.suscripcionRepository.updateAll(suscripcion, where);
  }

  @get('/suscripcions/{id}')
  @response(200, {
    description: 'Suscripcion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Suscripcion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Suscripcion, {exclude: 'where'}) filter?: FilterExcludingWhere<Suscripcion>
  ): Promise<Suscripcion> {
    return this.suscripcionRepository.findById(id, filter);
  }

  @patch('/suscripcions/{id}')
  @response(204, {
    description: 'Suscripcion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suscripcion, {partial: true}),
        },
      },
    })
    suscripcion: Suscripcion,
  ): Promise<void> {
    await this.suscripcionRepository.updateById(id, suscripcion);
  }

  @put('/suscripcions/{id}')
  @response(204, {
    description: 'Suscripcion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() suscripcion: Suscripcion,
  ): Promise<void> {
    await this.suscripcionRepository.replaceById(id, suscripcion);
  }

  @del('/suscripcions/{id}')
  @response(204, {
    description: 'Suscripcion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.suscripcionRepository.deleteById(id);
  }
}
