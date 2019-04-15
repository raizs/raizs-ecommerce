import { BaseRepository } from './Base.repository';

export class UserRepository extends BaseRepository {
  constructor() {
    super();

    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  createUser(body) {
    return this.post('resPartner/create', body);
  }

  getUser(fuid) {
    return this.get(`resPartner?fuid=${fuid}`);
  }

  updateUser(body, userId) {
    return this.post(`resPartner/completeSignup?id=${userId}`, body);
  }

  updateFirebaseUser(body, uid) {
    return this.post(`resPartner/updateFirebaseUser?uid=${uid}`, body);
  }
}