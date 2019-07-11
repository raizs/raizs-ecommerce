import {
  SHOW_FIXED_LOADING,
  CLOSE_FIXED_LOADING
} from "../../actions";

const initialState = {
  showFixed: false
};

export const loadingReducer = (state = initialState, action) => {
	switch(action.type) {
    case SHOW_FIXED_LOADING:
      return { ...state, showFixed: true };
    case CLOSE_FIXED_LOADING:
      return { ...state, showFixed: false };
      
		default:
			return state;
	}
};

