import './Widget.css';

import React from 'react';
import PropTypes from 'prop-types';

const Widget = ({ children, ...props }) => (
  <section aria-label="widget" className="widget" {...props}>
    {children}
  </section>
);

Widget.Header = ({ title, children }) => (
  <div aria-label="widget-header" className="widget--header capitalize">
    <h3 className="widget--header-title">{title}</h3>
    {children}
  </div>
);

Widget.Body = ({ children, ...props }) => (
  <div aria-label="widget-body" className="widget--body" {...props}>
    {children}
  </div>
);

Widget.Footer = ({ children, ...props }) => (
  <div aria-label="widget-footer" className="widget--footer mt-2" {...props}>
    {children}
  </div>
);

Widget.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

Widget.Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

Widget.Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Widget;
