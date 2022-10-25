import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Suscripcion, SuscripcionRelations, Plan, Servicio} from '../models';
import {PlanRepository} from './plan.repository';
import {ServicioRepository} from './servicio.repository';

export class SuscripcionRepository extends DefaultCrudRepository<
  Suscripcion,
  typeof Suscripcion.prototype.id,
  SuscripcionRelations
> {

  public readonly planes: HasManyRepositoryFactory<Plan, typeof Suscripcion.prototype.id>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Suscripcion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Suscripcion, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
