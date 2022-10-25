import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, Suscripcion} from '../models';
import {SuscripcionRepository} from './suscripcion.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly suscripcions: HasManyRepositoryFactory<Suscripcion, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SuscripcionRepository') protected suscripcionRepositoryGetter: Getter<SuscripcionRepository>,
  ) {
    super(Servicio, dataSource);
    this.suscripcions = this.createHasManyRepositoryFactoryFor('suscripcions', suscripcionRepositoryGetter,);
    this.registerInclusionResolver('suscripcions', this.suscripcions.inclusionResolver);
  }
}
