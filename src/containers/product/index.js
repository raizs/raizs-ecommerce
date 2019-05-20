import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const Product = Loadable({
	loader: () => import(/* webpackChunkName: "product" */ './Product.container'),
	loading: () => <Loading />,
	modules: ['product']
});

export { Product };