import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Persona, Credenciales} from '../models';
import {PersonaRepository} from './persona.repository';
import {CredencialesRepository} from './credenciales.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Administrador.prototype.id>;

  public readonly credenciales: HasOneRepositoryFactory<Credenciales, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('CredencialesRepository') protected credencialesRepositoryGetter: Getter<CredencialesRepository>,
  ) {
    super(Administrador, dataSource);
    this.credenciales = this.createHasOneRepositoryFactoryFor('credenciales', credencialesRepositoryGetter);
    this.registerInclusionResolver('credenciales', this.credenciales.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
