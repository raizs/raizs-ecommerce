import { BaseModel, Formatter } from '../../helpers';
import { SaleSubscription } from '..';
import sortby from 'lodash.sortby';

export class SaleSubscriptions extends BaseModel {
  constructor(subs) {
    super();
    
		this.all = subs.map(sub => new SaleSubscription(sub));
    this.totalItems = this.getTotalItemsOfAllSales();
    this.amountTotalOfSales = this.all.reduce((partial_sum, sub) => partial_sum + sub.amountTotal,0); 
    this.donation = Formatter.currency(0.2*this.amountTotalOfSales)
    this.savedAgrotoxics = this.totalItems*18
  }

	getLastSubscription() {
		if (this.all && this.all.length) {
			let sorted = sortby(this.all, sub => -sub.createDate.valueOf());
			return sorted[0];
		}
	}

	getTotalItemsOfAllSales() {
		let total = 0;
		for (var sale of this.all) {
			total += sale.itemCount;
		}
		return total;
	}

	getById(id) {
		return this.baseGetById(id, this.all);
	}
}