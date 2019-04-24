import { BaseController, StateToApi, SocialMediaHelper, Formatter, CepHelper } from '../../helpers';
import { User, CreditCards } from '../../entities';
import { UserRepository, UserAddressesRepository, PaymentRepository } from '../../repositories';

export class CheckoutController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.userRepo = new UserRepository();
    this.userAddressesRepo = new UserAddressesRepository();
    this.paymentRepo = new PaymentRepository();

    this._getUserSignupValues = this._getUserSignupValues.bind(this);
    this._getAddressValues = this._getAddressValues.bind(this);
    this._getCreateCreditCardInfo = this._getCreateCreditCardInfo.bind(this);
    
    this._clearAddressInfo = this._clearAddressInfo.bind(this);

    this.handleOpenSection = this.handleOpenSection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.clearUserInfo = this.clearUserInfo.bind(this);

    this.setUserAddressInfo = this.setUserAddressInfo.bind(this);

    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
    this.handleCompleteSignup = this.handleCompleteSignup.bind(this);
    this.handleEmailAndPasswordLogin = this.handleEmailAndPasswordLogin.bind(this);
    this.handleCepBlur = this.handleCepBlur.bind(this);
    this.handleNewAddressSubmit = this.handleNewAddressSubmit.bind(this);
    this.handleUpdateAddressSubmit = this.handleUpdateAddressSubmit.bind(this);
    this.handleSelectUserAddress = this.handleSelectUserAddress.bind(this);
    this.handleViewUserAddresses = this.handleViewUserAddresses.bind(this);
    this.handleNewAddressForm = this.handleNewAddressForm.bind(this);
    this.handleEditUserAddress = this.handleEditUserAddress.bind(this);
    this.handleCompleteAddressSection = this.handleCompleteAddressSection.bind(this);
    this.handleSelectPaymentMethod = this.handleSelectPaymentMethod.bind(this);

    this.handleSubmitPayment = this.handleSubmitPayment.bind(this);
    this.handleCreateCreditCard = this.handleCreateCreditCard.bind(this);
    this.handleSelectCreditCard = this.handleSelectCreditCard.bind(this);
    this.handleContinuePayment = this.handleContinuePayment.bind(this);
    
    this.handleConfirmOrder = this.handleConfirmOrder.bind(this);
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
      addressIsDefault: false
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
      signupCellphone: ''
    });
  }

  _getCreateCreditCardInfo() {
    const {
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave
    } = this.getState();

    return {
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave,
      mpid: this.getProps().user.mpid
    };
  }

  handleOpenSection(section) {
    const toState = { openedSection: section };
    switch(section) {
      case 'user': 
        toState.isUserSectionDone = false;
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
        toState.isUserSectionDone = true;
        break;
      }
      case 'payment': toState.isPaymentSectionDone = false; break;
    }

    this.toState(toState);
  }

  handleChange(e, format) {
    this.toState(this.baseHandleChange(e, format));
  }

  handleCheckboxChange(id) {
    const currentValue = this.getState()[id];
    this.toState(this.baseHandleCheckboxChange(id, currentValue));
  }

  handleRadioChange(e, id) {
    this.toState({ [id]: e.target.value });
  }

  async handleGoogleSignin() {
    const { firebase, setUserAction } = this.getProps();
    this.toState({ userSectionLoading: true });
  
    const { success, error, user, isNewUser } = await SocialMediaHelper.signInWithGoogle(firebase);
  }

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
    
    toApi = StateToApi.completeSignupUser(values);
    promise = await this.userRepo.updateUser(toApi, id);
    if(!promise.err) {
      setUserAction(new User(promise.data));
    }
    
    this.toState({ userSectionLoading: false, openedSection: 'address', isUserSectionDone: true });
  }
  
  async handleEmailAndPasswordLogin() {
    const { firebase, setUserAction } = this.getProps(); 
    const { loginEmailOrCellphone, loginPassword } = this.getState();

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
    const { value } = e.target;
    if(value.length < 9) {
      if(!value.length) return;
      return this.toState({ cepError: 'CEP inválido.' })
    }

    this.toState({ addressSectionLoading: true });
    const { success, msg, data } = await CepHelper.check(value);

    if(success) {
      this.toState({
        addressAddress: data.street,
        addressNeighbourhood: data.neighborhood,
        addressCity: data.city,
        addressState: data.state,
        addressSectionLoading: false
      });
    }
    else this.toState({ addressSectionLoading: false, cepError: msg });
  }

  async handleNewAddressSubmit() {
    const { user, setUserAddressesAction, selectUserAddressAction, userAddresses } = this.getProps();
    const values = this._getAddressValues();
    values.resPartnerId = user.id;
    if(!userAddresses || !userAddresses.all.length) values.creditCardShouldSave = true;

    this.toState({ addressSectionLoading: true });

    const toState = { addressSectionLoading: false };
    const toApi = StateToApi.createAddressCheckout(values);
    const promise = await this.userAddressesRepo.create(toApi);

    if(!promise.err) {
      const newUserAdresses = userAddresses.add(promise.data);
      toState.currentAddressSection = 'list';
      setUserAddressesAction(newUserAdresses);
      selectUserAddressAction(newUserAdresses.getDefaultUserAddress());
      this._clearAddressInfo();
    }
    
    this.toState(toState);
  }

  async handleUpdateAddressSubmit() {
    const { user, setUserAddressesAction, userAddresses, selectUserAddressAction } = this.getProps();
    const { editingAddressId } = this.getState();
    const values = this._getAddressValues();
    values.resPartnerId = user.id;

    this.toState({ addressSectionLoading: true });
    
    const toApi = StateToApi.createAddressCheckout(values);
    const promise = await this.userAddressesRepo.update(toApi, editingAddressId);

    if(!promise.err) {
      let newUserAdresses = userAddresses.update(editingAddressId, promise.data);
      if(promise.data.isDefaultAddress) newUserAdresses = newUserAdresses.fixDefaultAddress(promise.data.id);
      const selected = newUserAdresses.getById(promise.data.id);

      setUserAddressesAction(newUserAdresses);
      selectUserAddressAction(selected);
      this._clearAddressInfo();
      this.toState({
        currentAddressSection: 'list',
        editingAddressId: null,
        isEditingAddress: false
      });
    }
    
    this.toState({ addressSectionLoading: false });
  }

  handleSelectUserAddress(e) {
    const userAddressId = e.target.value;

    const { selectUserAddressAction, userAddresses } = this.getProps();
    const userAddress = userAddresses.getById(userAddressId);

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
    this.toState({ selectedPaymentMethod: id });
  }

  async handleSubmitPayment() {
    const { selectedPaymentMethod } = this.getState();
    const { selectedCreditCard } = this.getProps();
    
    let method = {
      creditCard: this.handleCreateCreditCard
    }[selectedPaymentMethod] || null;

    if(selectedPaymentMethod === 'creditCard' && selectedCreditCard)
      method = this.handleContinuePayment

    this.toState({ paymentSectionLoading: true });
    const methodRes = await method(); 
    
    
  }

  async handleCreateCreditCard() {
    const { creditCards, setCreditCardsAction, selectCreditCardAction } = this.getProps();
    const toApi = StateToApi.createCreditCard(this._getCreateCreditCardInfo());

    const promise = await this.paymentRepo.createCard(toApi);

    const toState = { paymentSectionLoading: false };

    if(!promise.err) {
      const newCreditCards = creditCards.add(promise.data);
      setCreditCardsAction(newCreditCards);
      selectCreditCardAction(newCreditCards.getDefaultCreditCard());
      toState.isPaymentSectionDone = true;
    }

    this.toState(toState);
    return promise;
  }

  handleSelectCreditCard(e) {
    const creditCardId = e.target.value;

    const { selectCreditCardAction, creditCards } = this.getProps();
    const creditCard = creditCards.getById(creditCardId);

    selectCreditCardAction(creditCard);
  }

  handleContinuePayment() {
    this.toState({ isPaymentSectionDone: true });
  }

  async handleConfirmOrder() {
    const { cart, user, selectedUserAddress, selectedCreditCard } = this.getProps();

    const toApi = StateToApi.checkout({ cart, user, selectedUserAddress, selectedCreditCard });

    const promise = await this.paymentRepo.createOrder(toApi);

    console.log(promise);
  }
}