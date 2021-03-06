import { BaseRepository } from './Base.repository';

export class UserAddressesRepository extends BaseRepository {
  constructor() {
    super();

    this.list = this.list.bind(this);
    this.delete = this.delete.bind(this);
  }

  create(body) {
    return this.post('userAddresses/create', body);
  }

  createFirst(body, id) {
    return this.put(`resPartner?id=${id}`, body);
  }

  update(body, id) {
    return this.put(`userAddresses/update?id=${id}`, body);
  }

  list(res_partner_id) {
    return this.get(`userAddresses?res_partner_id=${res_partner_id}`);
  }

  remove(id){
    return this.delete(`userAddresses?address_id=${id}`);

  }
}