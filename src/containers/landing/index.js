import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Landing = Loadable({
	loader: () => import(/* webpackChunkName: "landing" */ './Landing.container'),
	loading: () => <Loading />,
	modules: ['landing']
});

const LandingMobile = Loadable({
	loader: () => import(/* webpackChunkName: "landing-mobile" */ './Landing.container.mobile'),
	loading: () => <Loading />,
	modules: ['landing-mobile']
});

export { Landing, LandingMobile };