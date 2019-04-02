import { TOGGLE_USER_POPPER, CLOSE_USER_POPPER, OPEN_USER_POPPER } from "../../actions";

const initialState = {
	isUserPopperOpen: false
};

export const headerReducer = (state = initialState, action) => {
	switch(action.type) {
		case TOGGLE_USER_POPPER:
			return {
				...state,
				isUserPopperOpen: !state.isUserPopperOpen
			};
		case OPEN_USER_POPPER:
      return {
        ...state,
          isUserPopperOpen: true
			};
      case CLOSE_USER_POPPER:
			return {
        ...state,
        isUserPopperOpen: false
			};
		default:
			return state;
	}
};

