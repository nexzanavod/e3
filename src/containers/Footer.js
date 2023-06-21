import React, { Component } from 'react';
import PropTypes from 'prop-types';
import text from '../assets/texts.json';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    return (
      <div className='p-3 footer'>
        <p><a href={text.copyrights_link}>{text.copyrights_text}</a> &copy; {text.copyrights_year}</p>
        <p>{text.version}</p>
        <p>{text.footer_text}</p>
      </div>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
