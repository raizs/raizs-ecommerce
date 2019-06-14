import { 
  OPEN_MODAL_PRODUCT,
  CLOSE_MODAL_PRODUCT
} from "../../actions";

const initialState = {
  product: false,
  selectedProduct: null
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
      
		default:
			return state;
	}
};

