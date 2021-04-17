import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import { Select } from 'antd';
import { changeLang, checkLanguageSupport, supportLanguages } from '../../utils/languageTools';

import './header.scss';

const { Option } = Select;

const Header = ({ title, logo, pages }) => {
	const history = useHistory();
	const [hideHeader, setHideHeader] = useState(false);
	const {
		url,
		params: { locale },
	} = useRouteMatch();

	const handleScroll = useRef(debounce(() => setHideHeader(window.scrollY > 100), 50)).current;

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={classNames('header', { 'header--hide': hideHeader })}>
			{logo}
			<div className="header__title">{title}</div>
			<div className="header__links">
				{pages.map(page => (
					<NavLink
						key={page.path}
						to={`${url}${page.path}`}
						className="header__links__item"
						activeClassName="header__links__item--active"
					>
						{page.name}
					</NavLink>
				))}
			</div>
			<div className="header__select">
				<Select
					value={checkLanguageSupport(locale)}
					onChange={nextLanguage => changeLang({ history, currentLanguage: locale, nextLanguage })}
				>
					{supportLanguages.map(({ label, value }) => (
						<Option key={value} value={value}>
							{label}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
};

Header.defaultProps = {
	title: undefined,
	logo: undefined,
};

Header.propTypes = {
	title: PropTypes.string,
	logo: PropTypes.node,
	pages: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Header;
