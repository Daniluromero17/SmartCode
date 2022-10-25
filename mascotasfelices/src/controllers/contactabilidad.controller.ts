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
import {Contactabilidad} from '../models';
import {ContactabilidadRepository} from '../repositories';

export class ContactabilidadController {
  constructor(
    @repository(ContactabilidadRepository)
    public contactabilidadRepository : ContactabilidadRepository,
  ) {}

  @post('/contactabilidads')
  @response(200, {
    description: 'Contactabilidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contactabilidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactabilidad, {
            title: 'NewContactabilidad',
            exclude: ['id'],
          }),
        },
      },
    })
    contactabilidad: Omit<Contactabilidad, 'id'>,
  ): Promise<Contactabilidad> {
    return this.contactabilidadRepository.create(contactabilidad);
  }

  @get('/contactabilidads/count')
  @response(200, {
    description: 'Contactabilidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contactabilidad) where?: Where<Contactabilidad>,
  ): Promise<Count> {
    return this.contactabilidadRepository.count(where);
  }

  @get('/contactabilidads')
  @response(200, {
    description: 'Array of Contactabilidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contactabilidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contactabilidad) filter?: Filter<Contactabilidad>,
  ): Promise<Contactabilidad[]> {
    return this.contactabilidadRepository.find(filter);
  }

  @patch('/contactabilidads')
  @response(200, {
    description: 'Contactabilidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactabilidad, {partial: true}),
        },
      },
    })
    contactabilidad: Contactabilidad,
    @param.where(Contactabilidad) where?: Where<Contactabilidad>,
  ): Promise<Count> {
    return this.contactabilidadRepository.updateAll(contactabilidad, where);
  }

  @get('/contactabilidads/{id}')
  @response(200, {
    description: 'Contactabilidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contactabilidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contactabilidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Contactabilidad>
  ): Promise<Contactabilidad> {
    return this.contactabilidadRepository.findById(id, filter);
  }

  @patch('/contactabilidads/{id}')
  @response(204, {
    description: 'Contactabilidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactabilidad, {partial: true}),
        },
      },
    })
    contactabilidad: Contactabilidad,
  ): Promise<void> {
    await this.contactabilidadRepository.updateById(id, contactabilidad);
  }

  @put('/contactabilidads/{id}')
  @response(204, {
    description: 'Contactabilidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contactabilidad: Contactabilidad,
  ): Promise<void> {
    await this.contactabilidadRepository.replaceById(id, contactabilidad);
  }

  @del('/contactabilidads/{id}')
  @response(204, {
    description: 'Contactabilidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contactabilidadRepository.deleteById(id);
  }
}
