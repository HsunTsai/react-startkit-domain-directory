import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Redirect } from 'react-router-dom';
/* You can cache page when page cahnge by import CacheRoute & CacheSwitch */
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Loadable from 'react-loadable';
import { useIntl } from 'react-intl';

import Header from './common/header/Header';
import RouterLoading from './common/loading/Loading';

const loadablePage = loader => Loadable({ loader, loading: RouterLoading });

const pages = [
	{
		path: '/home',
		name: 'Home',
		component: loadablePage(() => import('./pages/home/Home')),
	},
	{
		path: '/about',
		name: 'About',
		component: loadablePage(() => import('./pages/about/About')),
	},
	{
		path: '/topic',
		name: 'Topic',
		component: loadablePage(() => import('./pages/topic/Topic')),
	},
	{
		path: '/loading',
		name: 'Loading',
		component: RouterLoading,
	},
];

const App = () => {
	const intl = useIntl();
	return (
		<div className="app">
			<Header pages={pages} />
			<Switch>
				{pages.map((page, index) => (
					<Route key={index.toString()} path={`/${intl.locale}${page.path}`} component={page.component} />
				))}
				<Redirect to={`/${intl.locale}${pages[0].path}`} />
			</Switch>
		</div>
	);
};

export default hot(App);
