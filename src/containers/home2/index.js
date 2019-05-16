import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Home2 = Loadable({
	loader: () => import(/* webpackChunkName: "home2" */ './Home2.container'),
	loading: () => <Loading />,
	modules: ['home2']
});

export { Home2 };