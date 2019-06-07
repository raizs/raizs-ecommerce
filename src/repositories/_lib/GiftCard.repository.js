import { BaseRepository } from './Base.repository';

export class GiftCardRepository extends BaseRepository {

  getGiftCard(partnerId){
    return this.get(`gift-card?partner_id=${partnerId}`);
  }
}