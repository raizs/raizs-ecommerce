import { BaseRepository } from './Base.repository';

export class StockRepository extends BaseRepository {

  getDailyStockLines(){
    return this.get("stock/daily-lines");
  }
}