import { SET_USER_ADDRESSES, SELECT_USER_ADDRESS } from "../../actions";
import { Cache } from "../../../helpers";
import { UserAddresses } from "../../../entities";

const cachedUserAddresses = Cache.getItem('userAddresses');
const model = cachedUserAddresses ? new UserAddresses(cachedUserAddresses) : null;

const initialState = {
  model,
  selected: model ? model.getDefaultUserAddress() : null
};

export const userAddressesReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_USER_ADDRESSES:
			return {
				...state,
				model: action.data
			};
		case SELECT_USER_ADDRESS:
			return {
				...state,
				selected: action.data
			};
		default:
			return state;
	}
};

