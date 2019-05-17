import { BaseController, Formatter, StateToApi } from '../../helpers';
import { User } from '../../entities';
import { UserRepository } from '../../repositories';
import { UpdateUserValidation } from '../../validation';

export class DashboardFormsController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.userRepo = new UserRepository();
  }
  
  handleChange(e, format) {
    const { errors } = this.getState();
    this.toState(this.baseHandleChange(e, format, errors));
  }

  userApiToState(user){
    const state = { ...this.getState(),
      ...user, 
      cpf:Formatter.formatCpf(user.cpf), 
      phone: Formatter.formatPhone(user.phone) };
    this.toState(state)
  }

  async updateUser(){
    console.log(this.getState()) 
    const { user: { id }, setUserAction } = this.getProps()
    console.log(id)
    const { errors, isValidated } = UpdateUserValidation.user(this.getState());
    console.log(errors, isValidated)
    if (!isValidated){
      return this.toState({errors})
    }
    const toApi = StateToApi.updateUserData(this.getState()) 
    const promise = await this.userRepo.updateUser(toApi, id)
    console.log(promise)
    console.log(toApi)
    if(!promise.err) {
      setUserAction(new User(promise.data));
    }
  }
}