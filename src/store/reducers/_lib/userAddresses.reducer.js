import { SET_USER_ADDRESSES } from "../../actions";
import { Cache } from "../../../helpers";
import { UserAddresses } from "../../../entities";

const cachedUserAddresses = Cache.getItem('userAddresses');

const initialState = {
	model: cachedUserAddresses ? new UserAddresses(cachedUserAddresses) : null
};

export const userAddressesReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_USER_ADDRESSES:
			return {
				...state,
				model: action.data
			};
		default:
			return state;
	}
};

