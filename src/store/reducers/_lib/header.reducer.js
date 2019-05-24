import { TOGGLE_USER_POPPER, CLOSE_USER_POPPER, OPEN_USER_POPPER, TOGGLE_SEARCH_BAR_ACTION } from "../../actions";

const initialState = {
	isUserPopperOpen: false,
	isSearchBarOpen: false
};

export const headerReducer = (state = initialState, action) => {
	switch(action.type) {
		case TOGGLE_USER_POPPER:
			return {
				...state,
				isUserPopperOpen: !state.isUserPopperOpen
			};
		case TOGGLE_SEARCH_BAR_ACTION:
			return {
				...state,
				isSearchBarOpen: action.data
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
