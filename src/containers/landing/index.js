import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Landing = Loadable({
	loader: () => import(/* webpackChunkName: "landing" */ './Landing.container'),
	loading: () => <Loading />,
	modules: ['landing']
});

export { Landing };