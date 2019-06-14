import { 
  OPEN_CART_WARNING_MODAL,
  CLOSE_CART_WARNING_MODAL
} from "../../actions";

const initialState = {
  isOpen: false,
  cartInfo: [],
  newCart: null,
  subscriptionCartInfo: [],
  newSubscriptionCart: null
};

export const cartWarningModalReducer = (state = initialState, action) => {
	switch(action.type) {
    case OPEN_CART_WARNING_MODAL:
			return {
				...state,
        ...action.data,
        isOpen: true
      };
    case CLOSE_CART_WARNING_MODAL:
			return {
				...state,
        ...initialState
      };
      
		default:
			return state;
	}
};

