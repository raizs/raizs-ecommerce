import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const OrderCompleted = Loadable({
	loader: () => import(/* webpackChunkName: "orderCompleted" */ './OrderCompleted.container'),
	loading: () => <Loading />,
	modules: ['orderCompleted']
});

export { OrderCompleted };