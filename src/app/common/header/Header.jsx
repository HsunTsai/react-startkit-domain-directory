import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import { Select } from 'antd';
import { changeLang, checkLanguageSupport, supportLanguages } from '../../utils/languageTools';

import ReactIcon from '../../../images/react_logo.png';

const { Option } = Select;

const Header = ({ pages }) => {
	const history = useHistory();
	const {
		url,
		params: { locale },
	} = useRouteMatch();

	return (
		<div className="app__header">
			<img alt="" className="app__header-icon" src={ReactIcon} />
			{pages.map(page => (
				<NavLink
					key={page.path}
					to={`${url}${page.path}`}
					className="app__header-item"
					activeClassName="app__header-item--active"
				>
					{page.name}
				</NavLink>
			))}
			<div className="app__header-select">
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

Header.propTypes = {
	pages: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Header;
