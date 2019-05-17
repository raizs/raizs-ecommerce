import { BaseController, Formatter, StateToApi, CepHelper } from '../../helpers';
import { User } from '../../entities';
import { UserRepository, UserAddressesRepository } from '../../repositories';
import { UpdateUserValidation } from '../../validation';

export class DashboardFormsController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.handleChange = this.handleChange.bind(this);
    this.handleCepBlur = this.handleCepBlur.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.manageAddress = this.manageAddress.bind(this);

    this.userRepo = new UserRepository();
    this.userAddressRepo = new UserAddressesRepository();
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
    const { user: { id }, setUserAction } = this.getProps()
    const { errors, isValidated } = UpdateUserValidation.user(this.getState());

    if (!isValidated){
      return this.toState({errors})
    }

    const toApi = StateToApi.updateUserData(this.getState()) 
    const promise = await this.userRepo.updateUser(toApi, id)

    if(!promise.err) {
      setUserAction(new User(promise.data));
      return this.getProps().history.push("/painel/usuario")
    }
  }
  addressApiToState(addresses){
    const { id } = this.getProps().match.params
    console.log(addresses)
    if (id != "novo" ){
      const address = this.getProps().user.addresses.getById(id)
      
      this.toState(address)

    }
  }

  async handleCepBlur(e) {
    const { value, id } = e.target;
    console.log(id)
    if (id == 'cep'){
      const { errors } = this.getState();
      if(value.length < 9) {
        if(!value.length) return;
        errors[id] = 'CEP inválido.';
        return this.toState({ errors })
      }
  
      this.toState({ loading: true });
      const { success, msg, data } = await CepHelper.check(value);
  
      if(success) {
        setTimeout(

          ()=>this.toState({
            street: data.street,
            neighbourhood: data.neighborhood,
            city: data.city,
            state: data.state,
            loading: false
          }),1000
          )
        }
      else {
        errors[id] = msg;
        this.toState({ addressSectionLoading: false, errors });
      }

    }
  }

  async manageAddress(){
    console.log("managing")
    const id = this.getProps().match.params.id
    const { user, setUserAction, history } = this.getProps()
    const values = this.getState();
    let newUser;
    if (id == "novo" ){
      values.parentId = user.id;
      const toApi = StateToApi.manageAddress(values)
      const promise = await this.userAddressRepo.create(toApi)

      const userOriginal = user.original;
      userOriginal.children.push(promise.data);
      newUser = new User(userOriginal);
  
    }
    else {
      values.parentId = user.id;
      const toApi = StateToApi.manageAddress(values)
      const promise = await this.userAddressRepo.update(toApi, id)

      if(!promise.err) {
        const updatedOriginal = user.getUpdatedChildren(promise.data);
        newUser = new User(updatedOriginal);
      }
      
    }
    setUserAction(newUser);
    history.push("/painel/usuario")

    
  }
    
}