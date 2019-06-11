export class Stock {

  constructor(stockLines) {
   	this.grouped = this.groupByDate(stockLines);
  }

  groupByDate(lines){
  	let groupedJson = {}
  	for (var line of lines){
  		if (!groupedJson[line["dailyStock.date"]]){
  			groupedJson[line["dailyStock.date"]] = {  }
  		}
		groupedJson[line["dailyStock.date"]][line.product_id] = line.value
  	}
  	return groupedJson
  }

  groupAvailabilitiesByDate(products, date){
  	const selectedDateStock = this.grouped[date.momentDate.format("YYYY-MM-DD")]
  	let available = [];
  	let unavailable = [];
  	if (selectedDateStock){
	  	for (var product of products.all){
	  		if (selectedDateStock[product.id]){
	  			available.push(product)
	  		}
	  		else {
	  			unavailable.push(product)

	  		}
	  	}

  	}
  	console.log(available, unavailable)
  	return {
  		available,
  		unavailable,
  	}
  }


}


