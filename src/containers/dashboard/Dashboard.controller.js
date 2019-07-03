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
      this.saleOrdersRepo.getOrders(id),
      this.saleSubscriptionsRepo.getSubscriptions(id)
    ];

    const [ saleOrders, saleSubscriptions ] = Promise.all(promises);

    if(!saleOrders.err) {
      const newSaleOrders = new SaleOrders(saleOrders.data);
      setSaleOrdersAction(newSaleOrders);
    } else console.log('sale orders fetch error', saleOrders.err);

    if(!saleSubscriptions.err) {
      const newSaleSubscriptions = new SaleSubscriptions(saleSubscriptions.data);
      setSaleSubscriptionsAction(newSaleSubscriptions);
    } else console.log('sale orders fetch error', saleSubscriptions.err);
  }
}