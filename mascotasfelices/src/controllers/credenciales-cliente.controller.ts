import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Credenciales,
  Cliente,
} from '../models';
import {CredencialesRepository} from '../repositories';

export class CredencialesClienteController {
  constructor(
    @repository(CredencialesRepository)
    public credencialesRepository: CredencialesRepository,
  ) { }

  @get('/credenciales/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Credenciales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Credenciales.prototype.id,
  ): Promise<Cliente> {
    return this.credencialesRepository.cliente(id);
  }
}
