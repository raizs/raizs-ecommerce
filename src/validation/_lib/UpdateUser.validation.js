import { validate as validateCpf } from 'gerador-validador-cpf';

export class UpdateUserValidation {
  
  static user(values) {
    const errors = {};
    const required = ['name', 'phone', 'cpf', 'lastName'];

    for(let i of required) {
			if(!values[i]) errors[i] = 'Campo obrigatório.';
    }
    console.log(values.cpf)
    if(!validateCpf(values.cpf)) errors.cpf = 'Cpf inválido.';
    
    return { errors, isValidated: !Object.keys(errors).length };
	}
	
}