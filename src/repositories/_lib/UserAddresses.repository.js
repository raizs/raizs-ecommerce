import { BaseRepository } from './Base.repository';

export class UserAddressesRepository extends BaseRepository {
  constructor() {
    super();

    this.list = this.list.bind(this);
  }

  create(body) {
    return this.post('userAddresses/create', body);
  }

  update(body, id) {
    return this.put(`userAddresses/update?id=${id}`, body);
  }

  list(res_partner_id) {
    return this.get(`userAddresses?res_partner_id=${res_partner_id}`);
  }
}