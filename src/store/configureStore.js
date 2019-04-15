import {
    createStore,
    compose,
    applyMiddleware
} from 'redux';
import ReduxThunk from 'redux-thunk'
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app'
import 'firebase/auth';

import firebaseConfig from '../config/firebase.config';

import rootReducer from './reducers';
firebase.initializeApp(firebaseConfig);

const createStoreWithMiddlewares = compose(
  reactReduxFirebase(firebase, { userProfile: 'users' }),
  applyMiddleware(ReduxThunk)
)(createStore);

export default function configureStore(initialState = {}) {
  return createStoreWithMiddlewares(rootReducer, initialState);
};
