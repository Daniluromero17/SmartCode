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
  Administrador,
} from '../models';
import {CredencialesRepository} from '../repositories';

export class CredencialesAdministradorController {
  constructor(
    @repository(CredencialesRepository)
    public credencialesRepository: CredencialesRepository,
  ) { }

  @get('/credenciales/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Credenciales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Credenciales.prototype.id,
  ): Promise<Administrador> {
    return this.credencialesRepository.administrador(id);
  }
}
