import { BaseRepository } from './Base.repository';

export class UserRepository extends BaseRepository {
  constructor() {
    super();

    this.createUser = this.createUser.bind(this);
  }

  createUser(body) {
    return this.post('resPartner/create', body);
  }
}