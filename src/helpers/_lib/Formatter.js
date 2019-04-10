export class Formatter {

  static extractNumbers(text) {
    let number = '';
		for (let i in text) {
			const n = text[i];
			if (parseInt(n) || parseInt(n) === 0) number += n;
    }
		return number;
	};

  static currency(amount) {
		if(typeof amount === 'object') return;
		
    amount = parseFloat(amount);
		amount = amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		return `R$ ${amount}`;
  }

  static formatCEP(cep) {
		let numbers = this.extractNumbers(cep);
		if (numbers.length > 5) numbers = numbers.substring(0, 5) + "-" + numbers.substring(5, numbers.length);

		return numbers.substring(0, 9);
	};
}