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
  Productos,
  Pedidos,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosPedidosController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Productos has many Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedidos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedidos>,
  ): Promise<Pedidos[]> {
    return this.productosRepository.pedidos(id).find(filter);
  }

  @post('/productos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Productos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidosInProductos',
            exclude: ['id'],
            optional: ['productosId']
          }),
        },
      },
    }) pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.productosRepository.pedidos(id).create(pedidos);
  }

  @patch('/productos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Productos.Pedidos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Partial<Pedidos>,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.productosRepository.pedidos(id).patch(pedidos, where);
  }

  @del('/productos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Productos.Pedidos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.productosRepository.pedidos(id).delete(where);
  }
}
