import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Subscription = Loadable({
	loader: () => import(/* webpackChunkName: "subscription" */ './Subscription.container'),
	loading: () => <Loading />,
	modules: ['subscription']
});

export { Subscription };