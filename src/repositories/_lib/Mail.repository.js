import { BaseRepository } from './Base.repository';

export class MailRepository extends BaseRepository {

  sendContactEmail(body){
    return this.post('mail/contact', body);
  }

  sendBePartnerEmail(body){
    return this.post('mail/partner', body);
  }

}