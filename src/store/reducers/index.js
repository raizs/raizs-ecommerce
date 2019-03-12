import { combineReducers } from 'redux';

import { appReducer } from "./_lib/app.reducer"

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;