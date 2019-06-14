import { BaseController, StateToApi, SocialMediaHelper, Formatter, CepHelper, CardHelper } from '../../helpers';
import {
  UserRepository,
  UserAddressesRepository,
  PaymentRepository,
  SaleOrdersRepository,
  SaleSubscriptionsRepository
} from '../../repositories';
import { User, SaleOrders, Transaction } from '../../entities';
import { CheckoutValidation } from '../../validation';

export class CheckoutController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.userRepo = new UserRepository();
    this.userAddressesRepo = new UserAddressesRepository();
    this.paymentRepo = new PaymentRepository();
    this.saleOrdersRepo = new SaleOrdersRepository();
    this.saleSubscriptionsRepo = new SaleSubscriptionsRepository();

    this._getUserSignupValues = this._getUserSignupValues.bind(this);
    this._getAddressValues = this._getAddressValues.bind(this);
    this._getCreateCardInfo = this._getCreateCardInfo.bind(this);
    
    this._clearAddressInfo = this._clearAddressInfo.bind(this);

    this.handleOpenSection = this.handleOpenSection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.clearUserInfo = this.clearUserInfo.bind(this);

    this.setUserAddressInfo = this.setUserAddressInfo.bind(this);

    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleCompleteSignup = this.handleCompleteSignup.bind(this);
    this.handleEmailAndPasswordLogin = this.handleEmailAndPasswordLogin.bind(this);
    this.handleCepBlur = this.handleCepBlur.bind(this);
    this.handleNewAddressSubmit = this.handleNewAddressSubmit.bind(this);
    this._handleNewAddress = this._handleNewAddress.bind(this);
    this.handleUpdateAddressSubmit = this.handleUpdateAddressSubmit.bind(this);
    this.handleSelectUserAddress = this.handleSelectUserAddress.bind(this);
    this.handleViewUserAddresses = this.handleViewUserAddresses.bind(this);
    this.handleNewAddressForm = this.handleNewAddressForm.bind(this);
    this.handleEditUserAddress = this.handleEditUserAddress.bind(this);
    this.handleCompleteAddressSection = this.handleCompleteAddressSection.bind(this);
    this.handleSelectPaymentMethod = this.handleSelectPaymentMethod.bind(this);

    this.handleSubmitPayment = this.handleSubmitPayment.bind(this);
    this.handleCardNumberBlur = this.handleCardNumberBlur.bind(this);
    this.handleCardExpDateBlur = this.handleCardExpDateBlur.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.handleContinuePayment = this.handleContinuePayment.bind(this);
    
    this.createSaleOrder = this.createSaleOrder.bind(this);
    this.createSubscription = this.createSubscription.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  _getUserSignupValues() {
    const {
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupPassword
    } = this.getState();

    return {
      signupName,
      signupLastName,
      signupCpf,
      signupEmail,
      signupCellphone,
      signupPassword
    };
  }

  _getAddressValues() {
    const {
      addressName,
      addressReceiverName,
      addressCep,
      addressAddress,
      addressNumber,
      addressComplement,
      addressNeighbourhood,
      addressCity,
      addressState,
      addressIsDefault
    } = this.getState();

    return {
      addressName,
      addressReceiverName,
      addressCep,
      addressAddress,
      addressNumber,
      addressComplement,
      addressNeighbourhood,
      addressCity,
      addressState,
      addressIsDefault
    };
  }

  _clearAddressInfo() {
    this.toState({
      addressName: '',
      addressReceiverName: '',
      addressCep: '',
      addressAddress: '',
      addressNumber: '',
      addressComplement: '',
      addressNeighbourhood: '',
      addressCity: '',
      addressState: '',
      addressIsDefault: false,
      addressSectionLoading: false
    });
  }

  setUserInfo(user) {
    const toState = {
      signupName: user.name,
      signupLastName: user.lastName,
      signupCpf: user.cpf,
      signupEmail: user.email,
      signupCellphone: Formatter.formatPhone(user.phone),
      userSectionLoading: false
    };
    if(user.isComplete) {
      toState.isUserSectionDone = true;
      toState.openedSection = 'address';
    }
    this.toState(toState);
  }

  setUserAddressInfo(userAddress) {
    this.toState({
      addressName: userAddress.name,
      addressReceiverName: userAddress.receiverName,
      addressCep: userAddress.cep,
      addressAddress: userAddress.address,
      addressNumber: userAddress.number,
      addressComplement: userAddress.complement,
      addressNeighbourhood: userAddress.neighbourhood,
      addressCity: userAddress.city,
      addressState: userAddress.state,
      addressIsDefault: userAddress.isDefaultAddress,
    });
  }

  clearUserInfo() {
    this.toState({
      loginEmailOrCellphone: '',
      loginPassword: '',
      signupName: '',
      signupLastName: '',
      signupCpf: '',
      signupEmail: '',
      signupCellphone: '',
      signupPassword: ''
    });
  }

  _getCreateCardInfo(type) {
    const {
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave,
      debitCardNumber,
      debitCardName,
      debitCardExp,
      debitCardCvv,
      debitCardShouldSave
    } = this.getState();

    return {
      credit: {
        cardNumber: creditCardNumber,
        cardName: creditCardName,
        cardExp: creditCardExp,
        cardCvv: creditCardCvv,
        cardShouldSave: creditCardShouldSave,
        mpid: this.getProps().user.mpid
      },
      debit: {
        cardNumber: debitCardNumber,
        cardName: debitCardName,
        cardExp: debitCardExp,
        cardCvv: debitCardCvv,
        cardShouldSave: debitCardShouldSave,
        mpid: this.getProps().user.mpid
      }
    }[type];
  }

  /**
   * handleOpenSection - handles the action to reopen a section which is
   * already done
   *
   * @param {String} section - the section to be open (user|address|payment)
   * @memberof CheckoutController
   */
  handleOpenSection(section) {
    const toState = { openedSection: section };
    switch(section) {
      case 'user': 
        toState.isUserSectionDone = false;
        toState.isAddressSectionDone = false;
        toState.isPaymentSectionDone = false;
        toState.loginEmailOrCellphone = '';
        toState.loginPassword = '';
        toState.signupName = '';
        toState.signupLastName = '';
        toState.signupCpf = '';
        toState.signupEmail = '';
        toState.signupCellphone = '';
        break;
      case 'address': {
        toState.isAddressSectionDone = false;
        toState.isPaymentSectionDone = false;
        toState.isUserSectionDone = true;
        break;
      }
      case 'payment': toState.isPaymentSectionDone = false; break;
    }

    this.toState(toState);
  }

  handleChange(e, format) {
    const { errors } = this.getState();
    this.toState(this.baseHandleChange(e, format, errors));
  }

  handleCheckboxChange(id) {
    const currentValue = this.getState()[id];
    this.toState(this.baseHandleCheckboxChange(id, currentValue));
  }

  handleRadioChange(e, id) {
    this.toState({ [id]: e.target.value });
  }

  async handleGoogleSignin(isFacebook = false) {
    const { firebase } = this.getProps();
    this.toState({ userSectionLoading: true });
  
    const method = isFacebook ? 'signInWithFacebook' : 'signInWithGoogle';
    const { error } = await SocialMediaHelper[method](firebase);

    if(error) this.toState({ userSectionLoading: false });
  }

  async handleSignup() {
    const { firebase } = this.getProps();
    const values = this._getUserSignupValues();

    const { errors, isValidated } = CheckoutValidation.signup(values);

    if(!isValidated) return this.toState({ errors });

    const toApi = StateToApi.signupUser(values);

    this.toState({ userSectionLoading: true });
    const promise = await this.userRepo.createUser(toApi);

    if(!promise.err)
      await SocialMediaHelper.signInWithEmailAndPassword(firebase, values.signupEmail, values.signupPassword);

    this.toState({ userSectionLoading: false });
  }

  /**
   * handleCompleteSignup - handles the complete user action
   *
   * @memberof CheckoutController
   */
  async handleCompleteSignup() {
    const { user: { id, fuid }, firebase, setUserAction } = this.getProps(); 
    const values = this._getUserSignupValues();
    
    this.toState({ userSectionLoading: true });

    let toApi = StateToApi.updateFirebaseUser(values);
    let promise = await this.userRepo.updateFirebaseUser(toApi, fuid);
    if(promise.err) {
      this.toState({ userSectionLoading: false });
      console.log(promise.err);
      throw 'Error updating firebase user';
    }
    
    await SocialMediaHelper.signInWithEmailAndPassword(firebase, values.signupEmail, values.signupPassword);
    
    toApi = StateToApi.signupUser(values);
    promise = await this.userRepo.updateUser(toApi, id);
    if(!promise.err) {
      setUserAction(new User(promise.data));
    }
    
    this.toState({ userSectionLoading: false, openedSection: 'address', isUserSectionDone: true });
  }
  
  async handleEmailAndPasswordLogin() {
    const { firebase, setUserAction } = this.getProps(); 
    const { loginEmailOrCellphone, loginPassword } = this.getState();

    const { errors, isValidated } = CheckoutValidation.emailAndPassword({ loginEmailOrCellphone, loginPassword });

    if(!isValidated) return this.toState({ errors });

    this.toState({ userSectionLoading: true });
    const promise = await SocialMediaHelper.signInWithEmailAndPassword(firebase, loginEmailOrCellphone, loginPassword);
    
    const toState = { userSectionLoading: false };

    if(!promise.error) {
      const pgUser = await this.userRepo.getUser(promise.user.uid);
        
      if(!pgUser.err) {
        const newUser = new User(pgUser.data);
        setUserAction(newUser);
        if(newUser.isComplete) toState.openedSection = 'address';
      }
    }

    this.toState(toState);
  }

  async handleCepBlur(e) {
    const { value, id } = e.target;
    const { errors } = this.getState();
    if(value.length < 9) {
      if(!value.length) return;
      errors[id] = 'CEP inválido.';
      return this.toState({ errors })
    }

    this.toState({ addressSectionLoading: true });
    const { success, msg, data } = await CepHelper.check(value);

    if(success) {
      this.toState({
        addressAddress: data.logradouro,
        addressNeighbourhood: data.bairro,
        addressCity: data.localidade,
        addressState: data.uf,
        addressSectionLoading: false
      });
    }
    else {
      errors[id] = msg;
      this.toState({ addressSectionLoading: false, errors });
    }
  }

  /**
   * handleNewAddressSubmit - chooses whether to call _handleFirstAddress or _handleNewAddress
   * according to user.hasAddress value
   *
   * @memberof CheckoutController
   */
  async handleNewAddressSubmit() {
    const { user } = this.getProps();
    const stateErrors = this.getState().errors;

    const values = this._getAddressValues();
    let toApi;

    const { isValidated, errors } = CheckoutValidation.address(values);

    if(!isValidated) return this.toState({ errors: { ...stateErrors, ...errors } });

    values.parentId = user.id;
    toApi = StateToApi.createAddressCheckout(values);

    this.toState({ addressSectionLoading: true });

    await this._handleNewAddress(toApi);
  }

  /**
   * _handleNewAddress - invoked if current user already has one or more addresses
   * creates the new user's address in db
   *
   * @param {Object} valuesToApi - object with db keys and values
   * @memberof CheckoutController
   */
  async _handleNewAddress(valuesToApi) {
    const { user, setUserAction, selectUserAddressAction } = this.getProps();

    const promise = await this.userAddressesRepo.create(valuesToApi);

    if(!promise.err) {
      const userOriginal = user.original;
      if(!userOriginal.children) userOriginal.children = [];
      userOriginal.children.push(promise.data);

      const newUser = new User(userOriginal);
      setUserAction(newUser);
      selectUserAddressAction(newUser.addresses.getById(promise.data.id));
      
      this._clearAddressInfo();
      this.toState({
        isAddressSectionDone: true,
        currentAddressSection: 'list',
        addressSectionLoading: false,
        openedSection: 'payment'
      });
    } else {
      this.toState({ addressSectionLoading: false });
    }
  }

  async handleUpdateAddressSubmit() {
    const { user, setUserAction, selectUserAddressAction } = this.getProps();
    const { editingAddressId } = this.getState();
    const values = this._getAddressValues();

    this.toState({ addressSectionLoading: true });
    
    values.parentId = user.id;
    const toApi = StateToApi.createAddressCheckout(values);
    const promise = await this.userAddressesRepo.update(toApi, editingAddressId);

    let toState = { addressSectionLoading: false };
    if(!promise.err) {
      const updatedOriginal = user.getUpdatedChildren(promise.data);
      const newUser = new User(updatedOriginal);
      const selected = newUser.addresses.getById(editingAddressId);

      setUserAction(newUser);
      selectUserAddressAction(selected);
      this._clearAddressInfo();
      toState = {
        ...toState,
        currentAddressSection: 'list',
        editingAddressId: null,
        isEditingAddress: false
      };
    }
    
    this.toState(toState);
  }

  handleSelectUserAddress(e) {
    const userAddressId = e.target.value;

    const { selectUserAddressAction, user } = this.getProps();
    const userAddress = user.addresses.getById(userAddressId);

    selectUserAddressAction(userAddress);
  }

  handleViewUserAddresses() {
    this.toState({
      currentAddressSection: 'list',
      isEditingAddress: false,
      editingAddressId: null
    });
  }

  handleNewAddressForm() {
    this._clearAddressInfo();
    this.toState({
      currentAddressSection: 'form',
      isEditingAddress: false,
      editingAddressId: null
    });
  }

  handleEditUserAddress(userAddress) {
    this.setUserAddressInfo(userAddress);
    this.toState({
      currentAddressSection: 'form',
      isEditingAddress: true,
      editingAddressId: userAddress.id
    });
  }

  handleCompleteAddressSection() {
    this.toState({ isAddressSectionDone: true, openedSection: 'payment' });
  }

  handleSelectPaymentMethod(id) {
    const { cards, selectCardAction } = this.getProps();
    
    if(id === 'debitCard') {
      if(!cards.debitCards.length) selectCardAction(null);
      else selectCardAction(cards.getDefaultDebitCard());
    }
    
    if(id === 'creditCard') {
      if(!cards.creditCards.length) selectCardAction(null);
      else selectCardAction(cards.getDefaultCreditCard());
    }
    
    this.toState({ selectedPaymentMethod: id });
  }

  async handleSubmitPayment() {
    const { selectedPaymentMethod } = this.getState();
    const { selectedCard } = this.getProps();
    
    let method = {
      creditCard: () => this.handleCreateCard('credit'),
      debitCard: () => this.handleCreateCard('debit')
    }[selectedPaymentMethod] || null;

    if(['creditCard', 'debitCard'].includes(selectedPaymentMethod) && selectedCard)
      method = this.handleContinuePayment

    this.toState({ paymentSectionLoading: true });
    await method(); 
  }

  async handleCreateCard(type) {
    const { cards, setCardsAction, selectCardAction } = this.getProps();
    
    const values = this._getCreateCardInfo(type);
    const { isValidated, errors } = CheckoutValidation.card(values, type);

    if(!isValidated) {
      const stateErrors = this.getState().errors;
      return this.toState({ errors: { ...stateErrors, ...errors }, paymentSectionLoading: false });
    }
    
    const toApi = StateToApi.createCard(values, type);
    const promise = await this.paymentRepo.createCard(toApi);
    
    const toState = { paymentSectionLoading: false };

    if(!promise.err) {
      const newCards = cards.add(promise.data);
      setCardsAction(newCards);
      selectCardAction(newCards.getDefaultCard());
      toState.isPaymentSectionDone = true;
    }

    this.toState(toState);
    return promise;
  }

  handleSelectCard(e) {
    const creditCardId = e.target.value;

    const { selectCardAction, cards } = this.getProps();
    const card = cards.getById(creditCardId);

    selectCardAction(card);
  }

  handleContinuePayment() {
    this.toState({ isPaymentSectionDone: true, paymentSectionLoading: false });
  }

  handleCardNumberBlur(e) {
    const { id, value } = e.target;
    const { isValid } = CardHelper.checkNumber(value);
    
    if(!isValid) {
      const { errors } = this.getState();
      errors[id] = 'Número inválido.'
      return this.toState({ errors });
    }
    return null;
  }

  handleCardExpDateBlur(e) {
    const { id, value } = e.target;
    const { isValid } = CardHelper.checkExpDate(value);
    
    if(!isValid) {
      const { errors } = this.getState();
      errors[id] = 'Data inválida.'
      return this.toState({ errors });
    }
    return null;
  }


  async handleConfirm(){
    const { cart, coupon, subscriptionCart, giftCard, history, momentDate } = this.getProps();
    const { selectedPaymentMethod } = this.getState();

    const transaction = new Transaction({ cart, subcart:subscriptionCart, coupon, giftCard, selectedPaymentMethod, momentDate });

    this.toState({loading:true});

    if (selectedPaymentMethod=="payPal"){
      console.log("PAYPAL LOGIC NEEDS TO BE DONE HERE");
    }
    else{
      if (transaction.totals.immediate.subtotal){
        // await this.createSaleOrder(transaction);
      }
      if (transaction.hasSubcart){
        await this.createSubscription(transaction);
      }
    }

    this.toState({loading:false});
    // return history.push("/pedido-finalizado")
  }

  async createSaleOrder(transaction) {
    const { 
      cart,
      user, 
      selectedUserAddress, 
      selectedCard, 
      momentDate, 
      setSaleOrdersAction 
    } = this.getProps();

    const toApi = StateToApi.saleOrderCheckout({
      cart,
      user, 
      selectedUserAddress, 
      selectedCard, 
      momentDate,
      transaction
    });

    const promise = await this.saleOrdersRepo.createOrder(toApi);


    if (promise.err){
      console.log("ERROR");
      return ;
    }
    else {
      const saleOrders = new SaleOrders(promise.data)
      setSaleOrdersAction(saleOrders)
    }
  }

  async createSubscription(transaction) {
    const {
      cart,
      user,
      selectedUserAddress,
      selectedCard,
      momentDate,
      subscriptionCart,
    } = this.getProps();

    const toApi = StateToApi.subscriptionCheckout({
      cart,
      user,
      selectedUserAddress,
      selectedCard,
      momentDate,
      subcart: subscriptionCart,
      transaction
    });


    const promise = await this.saleSubscriptionsRepo.createSubscription(toApi);
    // if (promise.err)
    //   console.log("ERROR")
    // else return history.push("pedido-finalizado")
    // console.log(promise);
  }
}