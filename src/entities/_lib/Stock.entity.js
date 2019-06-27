export class Stock {

  constructor(stockLines) {
		this.init = !!stockLines.length;
   	this.grouped = this.groupByDate(stockLines);
   	this.groupedByProductId = this.groupByProductId(stockLines);
  }

  groupByDate(lines) {
  	let grouped = {}
  	for (var line of lines) {
  		if (!grouped[line["dailyStock.date"]]) {
  			grouped[line["dailyStock.date"]] = {};
  		}
			grouped[line["dailyStock.date"]][line.product_id] = line.value
  	}
  	return grouped;
  }

  groupByProductId(lines) {
  	let grouped = {}
  	for (var line of lines) {
  		if (!grouped[line.product_id]) {
  			grouped[line.product_id] = {};
  		}
			grouped[line.product_id][line["dailyStock.date"]] = line.value;
  	}
  	return grouped;
  }

  groupAvailabilitiesByDate(products, date) {
  	const selectedDateStock = this.grouped[date.momentDate.format("YYYY-MM-DD")]
  	let available = [], unavailable = [];
  	if (selectedDateStock) {
	  	for (var product of products.all) {
	  		if (selectedDateStock[product.id]) {
	  			available.push(product)
	  		}
	  		else {
	  			unavailable.push(product)

	  		}
	  	}
  	}
  	return {
  		available,
  		unavailable,
  	}
  }
}