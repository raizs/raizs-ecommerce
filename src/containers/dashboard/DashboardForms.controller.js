import { BaseController, Formatter, StateToApi, CepHelper } from '../../helpers';
import { User } from '../../entities';
import { UserRepository, UserAddressesRepository, PaymentRepository } from '../../repositories';
import { UpdateUserValidation, CheckoutValidation } from '../../validation';

export class DashboardFormsController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.handleChange = this.handleChange.bind(this);
    this.handleCepBlur = this.handleCepBlur.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.manageAddress = this.manageAddress.bind(this);
    this.handleCardSubmit = this.handleCardSubmit.bind(this);

    this.userRepo = new UserRepository();
    this.userAddressRepo = new UserAddressesRepository();
    this.paymentRepo = new PaymentRepository();
  }
  

  handleChange(e, format) {
    const { errors } = this.getState();
    this.toState(this.baseHandleChange(e, format, errors));
  }

  userApiToState(user) {
    const state = {
      ...this.getState(),
      ...user, 
      cpf:Formatter.formatCpf(user.cpf), 
      phone: Formatter.formatPhone(user.phone)
    };
    this.toState(state)
  }

  async updateUser() {
    const { user: { id }, setUserAction, history } = this.getProps()
    const { errors, isValidated } = UpdateUserValidation.user(this.getState());

    if (!isValidated) return this.toState({ errors });

    const toApi = StateToApi.updateUserData(this.getState());
    const promise = await this.userRepo.updateUser(toApi, id);

    if(!promise.err) {
      setUserAction(new User(promise.data));
      return history.push("/painel/perfil");
    }
  }

  addressApiToState(addresses) {
    const { match, user } = this.getProps();
    const { id } = match.params;
    if (id != "novo" ) {
      const address = user.addresses.getById(id)
      this.toState(address);

    }
  }

  async handleCepBlur(e) {
    const { value, id } = e.target;
    if (id == 'cep') {
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
          () => this.toState({
            street: data.street,
            neighbourhood: data.neighborhood,
            city: data.city,
            state: data.state,
            loading: false
          }), 1000
        )
      }
      else {
        errors[id] = msg;
        this.toState({ addressSectionLoading: false, errors });
      }
    }
  }

  async manageAddress() {
    const id = this.getProps().match.params.id;
    const { user, setUserAction, history } = this.getProps();
    const values = this.getState();
    let newUser;

    if(id == "novo") {
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
    history.push("/painel/perfil")
  }

  async handleCardSubmit() {
    const { cards, setCardsAction, history, user } = this.getProps();
    const {
      cardNumber,
      cardName,
      cardExp,
      cardCvv
    } = this.getState();
    const values = {
      cardNumber,
      cardName,
      cardExp,
      cardCvv,
      mpid: user.mpid
    };

    console.log(values);
    const { isValidated, errors } = CheckoutValidation.card(values, 'credit');

    if(!isValidated) {
      const stateErrors = this.getState().errors;
      return this.toState({ errors: { ...stateErrors, ...errors } });
    }

    const toApi = StateToApi.createCard(values, 'credit')
    const promise = await this.paymentRepo.createCard(toApi);

    if(!promise.err) {
      const newCards = cards.add(promise.data);
      setCardsAction(newCards);
    }

    history.push("/painel/perfil")
  }
}