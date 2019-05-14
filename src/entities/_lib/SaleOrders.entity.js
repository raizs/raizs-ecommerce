import { BaseModel } from '../../helpers';
import { SaleOrder } from '..';
import sortby from 'lodash.sortby';

export class SaleOrders extends BaseModel {
  constructor(orders) {
    super();
    
    this.all = orders.map(order => new SaleOrder(order));
  }

	getLastOrder(){
		if (this.all && this.all.length){
			let sorted = sortby(this.all, order => -order.shippingEstimatedDate.valueOf())
			return sorted[0]
		}
	}
}