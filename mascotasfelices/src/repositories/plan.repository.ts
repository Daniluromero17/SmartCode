import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Mascota, Suscripcion} from '../models';
import {MascotaRepository} from './mascota.repository';
import {SuscripcionRepository} from './suscripcion.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof Plan.prototype.id>;

  public readonly suscripcion: HasOneRepositoryFactory<Suscripcion, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('SuscripcionRepository') protected suscripcionRepositoryGetter: Getter<SuscripcionRepository>,
  ) {
    super(Plan, dataSource);
    this.suscripcion = this.createHasOneRepositoryFactoryFor('suscripcion', suscripcionRepositoryGetter);
    this.registerInclusionResolver('suscripcion', this.suscripcion.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
