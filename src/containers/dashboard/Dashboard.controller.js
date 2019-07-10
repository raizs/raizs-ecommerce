import { BaseController } from "../../helpers";
import { SaleOrdersRepository, SaleSubscriptionsRepository } from "../../repositories";
import { SaleOrders, SaleSubscriptions } from "../../entities";

export class DashboardController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.saleOrdersRepo = new SaleOrdersRepository();
    this.saleSubscriptionsRepo = new SaleSubscriptionsRepository();
  }

  async initialFetch(id) {
    const { setSaleOrdersAction, setSaleSubscriptionsAction } = this.getProps();
    const promises = [
      this.saleOrdersRepo.getOrders(`partnerId=${id}`),
      this.saleSubscriptionsRepo.getSubscriptions(`partnerId=${id}`)
    ];

    const [ saleOrders, saleSubscriptions ] = await Promise.all(promises);
    console.log('saleSubscriptions', saleSubscriptions);

    if(!saleOrders.err) {
      const newSaleOrders = new SaleOrders(saleOrders.data);
      setSaleOrdersAction(newSaleOrders);
    } else console.log('sale orders fetch error', saleOrders.err);

    if(!saleSubscriptions.err) {
      const newSaleSubscriptions = new SaleSubscriptions(saleSubscriptions.data);
      console.log('newSale', newSaleSubscriptions);
      setSaleSubscriptionsAction(newSaleSubscriptions);
    } else console.log('sale orders fetch error', saleSubscriptions.err);
  }
}