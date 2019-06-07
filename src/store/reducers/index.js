import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import { cartReducer } from "./_lib/cart.reducer"
import { categoriesReducer } from "./_lib/categories.reducer"
import { cepReducer } from "./_lib/cep.reducer"
import { creditCardsReducer } from "./_lib/cards.reducer"
import { datePickerReducer } from "./_lib/datePicker.reducer"
import { headerReducer } from "./_lib/header.reducer"
import { miniCartReducer } from "./_lib/miniCart.reducer"
import { productBrandsReducer } from "./_lib/productBrands.reducer"
import { productsReducer } from "./_lib/products.reducer"
import { saleOrdersReducer } from "./_lib/saleOrders.reducer"
import { subscriptionCartReducer } from "./_lib/subscriptionCart.reducer"
import { subscriptionsReducer } from "./_lib/subscriptions.reducer"
import { unitsOfMeasureReducer } from "./_lib/unitsOfMeasure.reducer"
import { userReducer } from "./_lib/user.reducer"
import { userAddressesReducer } from "./_lib/userAddresses.reducer"
import { modalReducer } from "./_lib/modal.reducer"
import { couponReducer } from "./_lib/coupon.reducer"
import { giftCardReducer } from "./_lib/giftCard.reducer"

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  brands: productBrandsReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  cep: cepReducer,
  cards: creditCardsReducer,
  datePicker: datePickerReducer,
  header: headerReducer,
  miniCart: miniCartReducer,
  products: productsReducer,
  saleOrders: saleOrdersReducer,
  subscriptionCart: subscriptionCartReducer,
  subscriptions: subscriptionsReducer,
  unitsOfMeasure: unitsOfMeasureReducer,
  user: userReducer,
  userAddresses: userAddressesReducer,
  modal: modalReducer,
  coupon: couponReducer,
  giftCard: giftCardReducer
});

export default rootReducer;