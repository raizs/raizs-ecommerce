import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Catalog = Loadable({
	loader: () => import(/* webpackChunkName: "catalog" */ './Catalog.container'),
	loading: () => <Loading />,
	modules: ['catalog']
});

export { Catalog };