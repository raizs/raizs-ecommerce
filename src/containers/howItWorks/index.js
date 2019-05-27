import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const HowItWorks = Loadable({
	loader: () => import(/* webpackChunkName: "howItWorks" */ './HowItWorks.container'),
	loading: () => <Loading />,
	modules: ['howItWorks']
});

export { HowItWorks };