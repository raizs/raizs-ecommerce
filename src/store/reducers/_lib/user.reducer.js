import { SET_USER } from "../../actions";
import { Cache } from "../../../helpers";
import { User } from "../../../entities";

const cachedUser = Cache.getItem('user');

const initialState = {
	current: cachedUser ? new User(cachedUser) : null
};

export const userReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_USER:
			return {
				...state,
				current: action.data
			};
		default:
			return state;
	}
};

