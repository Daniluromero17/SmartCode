import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plan,
  Mascota,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanMascotaController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Plan.prototype.id,
  ): Promise<Mascota> {
    return this.planRepository.mascota(id);
  }
}
