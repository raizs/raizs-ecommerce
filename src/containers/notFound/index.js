import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const NotFound = Loadable({
	loader: () => import(/* webpackChunkName: "notFound" */ './NotFound.container'),
	loading: () => <Loading />,
	modules: ['notFound']
});

export { NotFound };