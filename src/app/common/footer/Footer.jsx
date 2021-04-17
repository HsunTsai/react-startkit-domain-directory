import React from 'react';
import PropTypes from 'prop-types';

import './footer.scss';

const Footer = ({ logo, title }) => (
	<div className="footer">
		<div className="footer__title">
			{logo}
			{title}
		</div>
		<div className="footer__body">
			<div className="footer__body__item">Footer Item Block 1</div>
			<div className="footer__body__item">Footer Item Block 2</div>
			<div className="footer__body__item">Footer Item Block 3</div>
		</div>
	</div>
);

Footer.defaultProps = {
	logo: undefined,
	title: undefined,
};

Footer.propTypes = {
	logo: PropTypes.node,
	title: PropTypes.string,
};

export default Footer;
