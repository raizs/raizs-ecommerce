import { BaseModel, Formatter } from '../../helpers';
import { SaleOrder } from '..';
import sortby from 'lodash.sortby';

export class SaleOrders extends BaseModel {
  constructor(orders) {
    super();
    
    this.all = orders.map(order => new SaleOrder(order));
    this.totalItems = this.getTotalItemsOfAllSales();
    this.amountTotalOfSales = this.all.reduce((partial_sum, order) => partial_sum + order.amountTotal,0); 
    this.donation = Formatter.currency(0.2*this.amountTotalOfSales)
    this.savedAgrotoxics = this.totalItems*18
  }

	getLastOrder(){
		if (this.all && this.all.length){
			let sorted = sortby(this.all, order => -order.createDate.valueOf());
			return sorted[0];
		}
	}

	getTotalItemsOfAllSales(){
		let total = 0;
		for (var sale of this.all){
			total += sale.getTotalOfItems();
		}
		return total;
	}
}