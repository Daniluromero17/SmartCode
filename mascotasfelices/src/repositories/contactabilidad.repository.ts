import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Contactabilidad, ContactabilidadRelations} from '../models';

export class ContactabilidadRepository extends DefaultCrudRepository<
  Contactabilidad,
  typeof Contactabilidad.prototype.id,
  ContactabilidadRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Contactabilidad, dataSource);
  }
}
