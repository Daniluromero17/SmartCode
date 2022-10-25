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
  Asesor,
} from '../models';
import {CredencialesRepository} from '../repositories';

export class CredencialesAsesorController {
  constructor(
    @repository(CredencialesRepository)
    public credencialesRepository: CredencialesRepository,
  ) { }

  @get('/credenciales/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Credenciales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Credenciales.prototype.id,
  ): Promise<Asesor> {
    return this.credencialesRepository.asesor(id);
  }
}
