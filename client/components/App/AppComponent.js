// @flow
import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import Navbar from '../Navbar/NavbarComponent';
import styles from './App.scss';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    google: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <Navbar />
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
