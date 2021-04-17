import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
/* You can cache page when page cahnge by import CacheRoute & CacheSwitch */
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Loadable from 'react-loadable';
import { useIntl } from 'react-intl';

import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import RouterLoading from './common/loading/Loading';
import ReactIcon from '../images/react_logo.png';

import './app.scss';

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
	const { locale } = useIntl();
	const history = useHistory();
	const headerFooterConfig = {
		title: 'React Demo',
		logo: <img alt="" className="app__icon" src={ReactIcon} onClick={() => history.push(`/${locale}/home`)} />,
	};
	return (
		<div className="app">
			<Header {...headerFooterConfig} pages={pages} />
			<Switch>
				{pages.map((page, index) => (
					<Route key={index.toString()} path={`/${locale}${page.path}`} component={page.component} />
				))}
				<Redirect to={`/${locale}${pages[0].path}`} />
			</Switch>
			<Footer {...headerFooterConfig} />
		</div>
	);
};

export default hot(App);
