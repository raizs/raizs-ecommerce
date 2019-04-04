import React from 'react'
import Loadable from 'react-loadable';

const Catalog = Loadable({
	loader: () => import(/* webpackChunkName: "catalog" */ './Catalog.container'),
	loading: () => <div>loading page...</div>,
	modules: ['catalog']
});

export { Catalog };