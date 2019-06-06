import { BaseRepository } from './Base.repository';

export class CouponsRepository extends BaseRepository {

  getCoupon(couponCode, partnerId){
    return this.get(`coupon?coupon_code=${couponCode}&partner_id=${partnerId}`);
  }
}