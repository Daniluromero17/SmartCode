import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Administrador, Asesor, Cliente} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly administradores: HasManyRepositoryFactory<Administrador, typeof Persona.prototype.id>;

  public readonly asesores: HasManyRepositoryFactory<Asesor, typeof Persona.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Persona, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.asesores = this.createHasManyRepositoryFactoryFor('asesores', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesores', this.asesores.inclusionResolver);
    this.administradores = this.createHasManyRepositoryFactoryFor('administradores', administradorRepositoryGetter,);
    this.registerInclusionResolver('administradores', this.administradores.inclusionResolver);
  }
}
