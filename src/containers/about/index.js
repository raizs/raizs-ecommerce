import React from 'react'
import Loadable from 'react-loadable';

const About = Loadable({
	loader: () => import(/* webpackChunkName: "about" */ './About.container'),
	loading: () => <div>loading page...</div>,
	modules: ['about']
});

export { About };