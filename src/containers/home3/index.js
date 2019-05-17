import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Home3 = Loadable({
	loader: () => import(/* webpackChunkName: "home3" */ './Home3.container'),
	loading: () => <Loading />,
	modules: ['home3']
});

export { Home3 };