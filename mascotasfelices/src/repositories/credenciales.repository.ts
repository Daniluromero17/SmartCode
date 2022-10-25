import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Credenciales, CredencialesRelations, Administrador, Cliente, Asesor} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {ClienteRepository} from './cliente.repository';
import {AsesorRepository} from './asesor.repository';

export class CredencialesRepository extends DefaultCrudRepository<
  Credenciales,
  typeof Credenciales.prototype.id,
  CredencialesRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Credenciales.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Credenciales.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Credenciales.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Credenciales, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
