import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import { cartReducer } from "./_lib/cart.reducer"
import { categoriesReducer } from "./_lib/categories.reducer"
import { creditCardsReducer } from "./_lib/cards.reducer"
import { datePickerReducer } from "./_lib/datePicker.reducer"
import { headerReducer } from "./_lib/header.reducer"
import { productBrandsReducer } from "./_lib/productBrands.reducer"
import { productsReducer } from "./_lib/products.reducer"
import { unitsOfMeasureReducer } from "./_lib/unitsOfMeasure.reducer"
import { userReducer } from "./_lib/user.reducer"
import { userAddressesReducer } from "./_lib/userAddresses.reducer"

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  
  brands: productBrandsReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  cards: creditCardsReducer,
  datePicker: datePickerReducer,
  header: headerReducer,
  products: productsReducer,
  unitsOfMeasure: unitsOfMeasureReducer,
  user: userReducer,
  userAddresses: userAddressesReducer
});

export default rootReducer;