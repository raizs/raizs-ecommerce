import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import { categoriesReducer } from "./_lib/categories.reducer"
import { headerReducer } from "./_lib/header.reducer"
import { productsReducer } from "./_lib/products.reducer"
import { unitsOfMeasureReducer } from "./_lib/unitsOfMeasure.reducer"
import { userReducer } from "./_lib/user.reducer"

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  
  categories: categoriesReducer,
  header: headerReducer,
  products: productsReducer,
  unitsOfMeasure: unitsOfMeasureReducer,
  user: userReducer
});

export default rootReducer;