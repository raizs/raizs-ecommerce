import { BaseRepository } from './Base.repository';

export class CouponsRepository extends BaseRepository {

  getCoupon(couponCode){
    return this.get(`coupon?coupon_code=${couponCode}`);
  }
}