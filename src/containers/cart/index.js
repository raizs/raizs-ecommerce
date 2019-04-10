import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Cart = Loadable({
	loader: () => import(/* webpackChunkName: "cart" */ './Cart.container'),
	loading: () => <Loading />,
	modules: ['cart']
});

export { Cart };