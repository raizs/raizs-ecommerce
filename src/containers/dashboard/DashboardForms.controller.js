import { BaseController, Formatter } from '../../helpers';

import { UserRepository } from '../../repositories';


export class DashboardFormsController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.handleChange = this.handleChange.bind(this);
    this.userRepo = new UserRepository();
  }
  
  handleChange(e, format) {
    const { errors } = this.getState();
    this.toState(this.baseHandleChange(e, format, {}));
  }

  userApiToState(user){
    const state = { ...this.getState(),
      ...user, 
      cpf:Formatter.formatCpf(user.cpf), 
      phone: Formatter.formatPhone(user.phone) };
    this.toState(state)
  }

  updateUser(){
    console.log("UPDATING USER")
  }
}