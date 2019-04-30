import { validate as validateCpf } from 'gerador-validador-cpf';

export class CheckoutValidation {
  
  static emailAndPassword(values) {
    const errors = {};
    const required = ['loginEmailOrCellphone', 'loginPassword'];

    for(let i of required) {
			if(!values[i]) errors[i] = 'Campo obrigatório.';
    }
    
    return { errors, isValidated: !Object.keys(errors).length };
	}
	
	static signup(values) {
		const errors = {};
    const required = [
			'signupName',
			'signupLastName',
			'signupCpf',
			'signupEmail',
			'signupCellphone',
			'signupPassword'
		];

		const cpf = ['signupCpf'];

		for(let i of cpf) {
			if(!validateCpf(values[i])) errors[i] = 'Cpf inválido.';
		}

    for(let i of required) {
			if(!values[i]) errors[i] = 'Campo obrigatório.';
    }
    
    return { errors, isValidated: !Object.keys(errors).length };
	}

	static address(values) {
		const errors = {};
    const required = [
			'addressName',
			'addressReceiverName',
			'addressCep',
			'addressAddress',
			'addressNumber',
			'addressNeighbourhood',
			'addressCity',
			'addressState'
		];

    for(let i of required) {
			if(!values[i]) errors[i] = 'Campo obrigatório.';
    }
    
    return { errors, isValidated: !Object.keys(errors).length };
	}

	static creditCard(values) {
		const errors = {};
		const required = [
			'creditCardNumber',
			'creditCardName',
			'creditCardExp',
			'creditCardCvv'
		];

		for(let i of required) {
			if(!values[i]) errors[i] = 'Campo obrigatório.';
    }
    
    return { errors, isValidated: !Object.keys(errors).length };
	}
}