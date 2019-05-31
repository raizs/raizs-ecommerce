import { BaseController } from '../../../helpers';
import { CouponsRepository } from "../../../repositories"
import { Coupon } from '../../../entities';


export class CouponController extends BaseController {

  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    console.log("starting")
    this.couponsRepo = new CouponsRepository();
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRestartCoupon = this.handleRestartCoupon.bind(this)
  }    


  async handleChange(e, format) {
    const { errors } = this.getState();
    await this.toState(this.baseHandleChange(e, null, errors));
  }


  handleRestartCoupon(){
  	const { setCouponAction } = this.getProps()
  	this.toState({searched:false, couponCode:""});
  	setCouponAction(null)
  }

  async handleSearch(){
    this.toState({loading:true});
    const { couponCode } = this.getState();
  	const { setCouponAction } = this.getProps()
    const promise = await this.couponsRepo.getCoupon(couponCode)
    if (promise.err){
    	this.toState({loading:false, searched:true})
    	setCouponAction(null)
    }
    else {
    	const couponEnt = new Coupon(promise.data);
    	this.toState({loading:false, searched:true});
    	setCouponAction(couponEnt);
    }
    this.toState({loading:false});

  	// const { search } = this.getState();
  	// const { products } = this.getProps();

  	// this.toState({results})
  }

}
