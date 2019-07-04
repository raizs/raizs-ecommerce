import { BaseModel } from '../../helpers';
import moment from "moment";

export class SaleSubscription extends BaseModel {
  constructor(sub) {
    super();
    this.original = sub;
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
