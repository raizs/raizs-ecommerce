import { BaseModel } from '../../helpers';
import moment from "moment";

export class SaleSubscription extends BaseModel {
  constructor(sub = { subscription: {}, lines: [] }) {
    super();
    this.original = sub;
    const { subscription, lines } = sub;

    this.recurringNextMomentDate = moment(subscription.recurring_next_date, "YYYY-MM-DD");
    this.recurringNextDate = moment(this.recurringNextMomentDate).format("DD/MM");
    this.recurringNextWeekDay = moment(this.recurringNextMomentDate).format("dddd");
    this.id = subscription.id;
    this.name = subscription.name;
    this.amountTotal = parseFloat(subscription.amount_total);
    this.lines = lines;
    this.freeShipping = this.amountTotal > 100;
    this.subscriptionId = this.subscriptionId;
    this.hasDonation = false;
    this.shippingTimeRange = "07h30 até 13h00";
    this.createDate = moment(subscription.create_date);

    this.itemCount = this._countItems(lines);
    this.itemCountString = this._getItemCountString(this.itemCount);

    this.totalPrice = this._calculatePrice(lines);
    
    this.state = subscription.state;
    this.stateString = this._getStatus(subscription.state);

    this.shouldShowNextDelivery = ['draft','open'].includes(this.state);
  }

  _countItems(lines, weekFilter) {
    if(!lines) return 0;
  	let sum = 0;
  	for (let line of lines) {
      if (weekFilter && weekFilter !== line.delivery_week) continue;
  		sum += parseInt(line.quantity);
  	}
  	return sum;
  }

  _getItemCountString(itemCount) {
    return `${itemCount} ${itemCount > 1 ? 'itens' : 'item'}`;
  }

  _calculatePrice(lines) {
    if(!lines) return 0;
    let sum = 0;
    for(let line of lines) {
      sum += parseFloat(line.price_unit) * line.quantity
    }
    return sum;
  }

  _getStatus(state) {
    return {
      draft: 'Nova',
      open: 'Ativa',
      pending: 'Pendente',
      close: 'Inativa',
      cancel: 'Cancelada'
    }[state] || '-';
  }
}