import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Home = Loadable({
	loader: () => import(/* webpackChunkName: "home" */ './Home.container'),
	loading: () => <Loading />,
	modules: ['home']
});

export { Home };