import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Families = Loadable({
	loader: () => import(/* webpackChunkName: "families" */ './Families.container'),
	loading: () => <Loading />,
	modules: ['families']
});

export { Families };