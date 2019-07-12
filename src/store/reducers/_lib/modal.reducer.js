import { 
  OPEN_MODAL_PRODUCT,
  CLOSE_MODAL_PRODUCT,
  SHOW_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL
} from "../../actions";

const initialState = {
  product: false,
  selectedProduct: null,
  confirmation: false,
  confirmationError: false,
  confirmationMessage: "",
  confirmationTitle:"",
  confirmationLabel: '',
  cancelLabel: ''
};

export const modalReducer = (state = initialState, action) => {
	switch(action.type) {
    case OPEN_MODAL_PRODUCT:
			return {
				...state,
        selectedProduct: action.data,
        product:true
      };
    case CLOSE_MODAL_PRODUCT:
			return {
				...state,
        selectedProduct: null,
        product:false
      };
    case SHOW_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmation: true,
        confirmationError: !!action.data.error,
        confirmationMessage: action.data.msg,
        confirmationCallback: action.data.callback,
        confirmationTitle: action.data.title,
        confirmationLabel: action.data.confirmationLabel,
        cancelLabel: action.data.cancelLabel,
      };
    case CLOSE_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmation: false,
        confirmationError: false,
        confirmationMessage: "",
        confirmationTitle:""
      };
      
		default:
			return state;
	}
};

