import { BaseController, StateToApi, SocialMediaHelper, Formatter, CepHelper } from '../../helpers';
import { User, UserAddresses } from '../../entities';
import { UserRepository, UserAddressesRepository } from '../../repositories';

export class CheckoutController extends BaseController {
  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.userRepo = new UserRepository();
    this.userAddressesRepo = new UserAddressesRepository();

    this._getUserSignupValues = this._getUserSignupValues.bind(this);
    this._getAddressValues = this._getAddressValues.bind(this);
    this._clearAddressInfo = this._clearAddressInfo.bind(this);

    this.handleOpenSection = this.handleOpenSection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.clearUserInfo = this.clearUserInfo.bind(this);

    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
    this.handleCompleteSignup = this.handleCompleteSignup.bind(this);
    this.handleEmailAndPasswordLogin = this.handleEmailAndPasswordLogin.bind(this);
    this.handleCepBlur = this.handleCepBlur.bind(this);
    this.handleNewAddressSubmit = this.handleNewAddressSubmit.bind(this);
    this.handleSelectUserAddress = this.handleSelectUserAddress.bind(this);
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
    this.toState({
      signupName: user.name,
      signupLastName: user.lastName,
      signupCpf: user.cpf,
      signupEmail: user.email,
      signupCellphone: Formatter.formatPhone(user.phone)
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

  handleOpenSection(section) {
    this.toState({
      openedSection: section,
      loginEmailOrCellphone: '',
      loginPassword: '',
      signupName: '',
      signupLastName: '',
      signupCpf: '',
      signupEmail: '',
      signupCellphone: ''
    });
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
    
    const toState = { userSectionLoading: false };

    if(success) {
      const { createUser, getUser } = this.userRepo;
      if(isNewUser) {
        const pgUser = await createUser(StateToApi.createUserFromGoogleSignIn(user));
        
        if(!pgUser.err) setUserAction(new User(pgUser.data));
      } else {
        const pgUser = await getUser(user.uid);
        
        if(!pgUser.err) {
          const newUser = new User(pgUser.data);
          setUserAction(newUser);
          if(newUser.isComplete) toState.openedSection = 'address';
        }
      }
    }

    this.toState(toState);
  }

  async handleCompleteSignup() {
    const { user: { id, fuid }, firebase, setUserAction } = this.getProps(); 
    const values = this._getUserSignupValues();
    
    this.toState({ userSectionLoading: true });

    let toApi = StateToApi.updateFirebaseUser(values);
    let promise = await this.userRepo.updateFirebaseUser(toApi, fuid);
    if(promise.err) {
      this.toState({ userSectionLoading: false });
      throw 'Error updating firebase user';
    }
    
    await SocialMediaHelper.signInWithEmailAndPassword(firebase, values.signupEmail, values.signupPassword);
    
    toApi = StateToApi.completeSignupUser(values);
    promise = await this.userRepo.updateUser(toApi, id);
    if(!promise.err) {
      setUserAction(new User(promise.data));
    }
    
    this.toState({ userSectionLoading: false, openedSection: 'address' });
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
    const { user, setUserAddressesAction, userAddresses } = this.getProps();
    const values = this._getAddressValues();
    values.resPartnerId = user.id;

    this.toState({ addressSectionLoading: true });
    
    const toApi = StateToApi.createAddressCheckout(values);
    const promise = await this.userAddressesRepo.create(toApi);

    if(!promise.err) {
      const newUserAdresses = userAddresses.add(promise.data);
      setUserAddressesAction(newUserAdresses);
      this._clearAddressInfo();
    }
    
    this.toState({ addressSectionLoading: false });
  }

  handleSelectUserAddress(userAddressId) {
    const { selectUserAddressAction, userAddresses } = this.getProps();
    const userAddress = userAddresses.getById(userAddressId);

    selectUserAddressAction(userAddress);
  }
}