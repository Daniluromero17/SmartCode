import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesor, AsesorRelations, Persona, Credenciales} from '../models';
import {PersonaRepository} from './persona.repository';
import {CredencialesRepository} from './credenciales.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Asesor.prototype.id>;

  public readonly credenciales: HasOneRepositoryFactory<Credenciales, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('CredencialesRepository') protected credencialesRepositoryGetter: Getter<CredencialesRepository>,
  ) {
    super(Asesor, dataSource);
    this.credenciales = this.createHasOneRepositoryFactoryFor('credenciales', credencialesRepositoryGetter);
    this.registerInclusionResolver('credenciales', this.credenciales.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
