import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Checkout = Loadable({
	loader: () => import(/* webpackChunkName: "checkout" */ './Checkout.container'),
	loading: () => <Loading />,
	modules: ['checkout']
});

export { Checkout };