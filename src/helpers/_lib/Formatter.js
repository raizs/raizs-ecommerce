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

	static formatCpf(cpf) {
		if (cpf.length > 3 && cpf[3] !== ".") cpf = cpf.substring(0, 3) + "." + cpf.substring(3, cpf.length);
		if (cpf.length > 7 && cpf[7] !== ".") cpf = cpf.substring(0, 7) + "." + cpf.substring(7, cpf.length);
		if (cpf.length > 11 && cpf[11] !== "-") cpf = cpf.substring(0, 11) + "-" + cpf.substring(11, cpf.length);

		return cpf.substring(0, 14);
	};

	static formatPhone(phone) {
		phone = this.extractNumbers(phone);
		if (phone.length > 0 && phone[0] !== "(") phone = "(" + phone;
		if (phone.length > 3 && phone[3] !== ")") phone = phone.substring(0, 3) + ")" + phone.substring(3, phone.length);
		if (phone.length > 4 && phone[4] !== " ") phone = phone.substring(0, 4) + " " + phone.substring(4, phone.length);

		phone = phone.replace(/[-]/g, "");
		if (phone.length > 13) phone = phone.substring(0, 10) + "-" + phone.substring(10, phone.length);
		else if (phone.length > 9) phone = phone.substring(0, 9) + "-" + phone.substring(9, phone.length);

		return phone.substring(0, 15);
	};

	static formatCreditCardNumber(value) {
		value = this.extractNumbers(value);
		if (value.length > 4 && value[4] !== "-") value = value.substring(0, 4) + "-" + value.substring(4, value.length);
		if (value.length > 9 && value[9] !== "-") value = value.substring(0, 9) + "-" + value.substring(9, value.length);
		if (value.length > 14 && value[14] !== "-") value = value.substring(0, 14) + "-" + value.substring(14, value.length);

		return value.substring(0, 19);
	};

	static formatCreditCardExp(value) {
		value = this.extractNumbers(value);
		if (value.length > 2 && value[2] !== "/") value = value.substring(0, 2) + "/" + value.substring(2, value.length);

		return value.substring(0, 7);
	};

	static formatCreditCardCvv(value) {
		value = this.extractNumbers(value);
		return value.substring(0, 4);
	};
}