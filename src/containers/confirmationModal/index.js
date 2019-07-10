import React from 'react'
import Loadable from 'react-loadable';
import { Loading } from '../../molecules';

const ConfirmationModal = Loadable({
	loader: () => import(/* webpackChunkName: "confirmationModal" */ './ConfirmationModal.container'),
	loading: () => <Loading />,
	modules: ['confirmationModal']
});

export { ConfirmationModal };