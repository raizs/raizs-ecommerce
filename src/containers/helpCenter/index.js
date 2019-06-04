import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const HelpCenter = Loadable({
	loader: () => import(/* webpackChunkName: "helpCenter" */ './HelpCenter.container'),
	loading: () => <Loading />,
	modules: ['helpCenter']
});

export { HelpCenter };