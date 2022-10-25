import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Persona, Pedidos, Mascota, Plan, Credenciales} from '../models';
import {PersonaRepository} from './persona.repository';
import {PedidosRepository} from './pedidos.repository';
import {MascotaRepository} from './mascota.repository';
import {PlanRepository} from './plan.repository';
import {CredencialesRepository} from './credenciales.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Cliente.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Cliente.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.id>;

  public readonly plan: HasOneRepositoryFactory<Plan, typeof Cliente.prototype.id>;

  public readonly credenciales: HasOneRepositoryFactory<Credenciales, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('CredencialesRepository') protected credencialesRepositoryGetter: Getter<CredencialesRepository>,
  ) {
    super(Cliente, dataSource);
    this.credenciales = this.createHasOneRepositoryFactoryFor('credenciales', credencialesRepositoryGetter);
    this.registerInclusionResolver('credenciales', this.credenciales.inclusionResolver);
    this.plan = this.createHasOneRepositoryFactoryFor('plan', planRepositoryGetter);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
