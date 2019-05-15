import { BaseRepository } from './Base.repository';

export class NewsletterTargetsRepository extends BaseRepository {

  create(body) {
    return this.post('newsletterTargets/create', body);
  }
}