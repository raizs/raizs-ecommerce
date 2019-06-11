import { BaseModel } from '../../helpers';
import moment from "moment";

export class SaleOrder extends BaseModel {
  constructor(order) {
    super();
    this.shippingEstimatedDate = moment(order.shippingEstimatedDate, "YYYY-MM-DD");
    this.id = order.id;
    this.amountTotal = parseFloat(order.amount_total);
    this.lines = order.lines;
    this.freeShipping = this.amountTotal > 100;
    this.subscriptionId = this.subscriptionId;
    this.hasDonation = false;
    this.shippingTimeRange = "7:30 até 13:00";
    this.createDate = moment(order.create_date);
  }

  getTotalOfItems(){
  	let total = 0;
  	for (var line of this.lines){
  		total += parseInt(line.productUomQty)
  	}
  	return total;
  }
}
