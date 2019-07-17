import { BaseController } from '../../helpers';
import { SaleOrdersRepository, SaleSubscriptionsRepository } from "../../repositories";
import { SaleOrders, SaleSubscriptions } from "../../entities";
import queryString from "query-string";

export class OrderCompletedController extends BaseController {

	constructor({ toState, getState, getProps }) {
		super({ toState, getState, getProps });
		this.saleOrdersRepo = new SaleOrdersRepository();
		this.saleSubscriptionsRepo = new SaleSubscriptionsRepository();
	}

	async fetchData() {
		const { location, setSaleOrdersAction, setSaleSubscriptionsAction, user } = this.getProps();
		const { saleId, subscriptionId, total, shippingDiscount } = queryString.parse(location.search);
		const promises = [
			this.saleOrdersRepo.getOrders(`partnerId=${user.id}`),
			this.saleSubscriptionsRepo.getSubscriptions(`partnerId=${user.id}`)
		];

		const [ saleOrders, saleSubscriptions ] = await Promise.all(promises);
		let newSaleOrders = null, newSaleSubscriptions = null;
		if(!saleOrders.err) {
			newSaleOrders = new SaleOrders(saleOrders.data);
			setSaleOrdersAction(newSaleOrders);
		} 
		else console.log('sale orders fetch error', saleOrders.err);

		if(!saleSubscriptions.err) {
			newSaleSubscriptions = new SaleSubscriptions(saleSubscriptions.data);
			setSaleSubscriptionsAction(newSaleSubscriptions)
		} 
		else console.log('sale orders fetch error', saleSubscriptions.err);
		let order = [];
		let sub = [];

		if (saleId) {
			order = newSaleOrders.all.find(s => s.id === saleId);
		}

		if (subscriptionId) {
			sub = newSaleSubscriptions.all.find(s => s.id === subscriptionId);
		}
		
		this.toState({ order, sub, loading:false, total:total/100, shippingDiscount });
	}
      
}