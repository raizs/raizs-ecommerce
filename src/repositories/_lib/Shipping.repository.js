import { BaseRepository } from './Base.repository';

export class ShippingRepository extends BaseRepository {

  getShippingData(){
    return this.post("shipping");
  }
}