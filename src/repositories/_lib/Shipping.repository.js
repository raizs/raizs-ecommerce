import { BaseRepository } from './Base.repository';

export class ShippingRepository extends BaseRepository {

  getShippingData(cep){
    return this.post(`shipping?cep=${cep}`);
  }
}