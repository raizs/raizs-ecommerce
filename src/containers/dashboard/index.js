import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Dashboard = Loadable({
	loader: () => import(/* webpackChunkName: "dashboard" */ './Dashboard.container'),
	loading: () => <Loading />,
	modules: ['dashboard']
});

export { Dashboard };