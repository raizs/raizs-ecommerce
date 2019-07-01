import { BaseModel } from '../../helpers';
import moment from "moment";

export class SaleOrder extends BaseModel {
  constructor(order) {
    super();
    this.original = order;

    this.shippingEstimatedMonmentDate = moment(order.shippingEstimatedDate, "YYYY-MM-DD");
    this.shippingEstimatedDate = moment(this.shippingEstimatedMonmentDate).format("DD/MM");
    this.shippingEstimatedWeekDay = moment(this.shippingEstimatedMonmentDate).format("dddd");
    this.id = order.id;
    this.name = order.name;
    this.amountTotal = parseFloat(order.amount_total);
    this.lines = order.lines;
    this.freeShipping = this.amountTotal > 100;
    this.subscriptionId = this.subscriptionId;
    this.hasDonation = false;
    this.shippingTimeRange = "07h30 até 13h00";
    this.createDate = moment(order.create_date);

    this.itemCount = this._countItems(order.lines);
    this.itemCountString = this._getItemCountString(this.itemCount);
    
    this.state = order.state;
    this.stateString = this._getStatus(order.state);
  }

  _countItems(lines) {
  	let sum = 0;
  	for (let line of lines) {
  		sum += parseInt(line.productUomQty);
  	}
  	return sum;
  }

  _getItemCountString(itemCount) {
    return `${itemCount} ${itemCount > 1 ? 'itens' : 'item'}`;
  }

  _getStatus(state) {
    return {
      draft: 'Pendente',
      sent: 'Entregue',
      sale: 'Confirmado',
      done: 'Confirmado',
      cancel: 'Cancelado'
    }[state] || '-';
  }
}
