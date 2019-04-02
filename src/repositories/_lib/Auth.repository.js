import { BaseRepository } from './Base.repository';

export class AuthRepository extends BaseRepository {
  signInWithEmailAndPassword(body) {
    return this.post('signInWithEmailAndPassword', body);
  }
}