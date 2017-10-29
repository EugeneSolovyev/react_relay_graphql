import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import GoogleQuery from './GoogleQuery';
import AppContainer from '../components/App/AppContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';
import FavoriteContainer from '../components/FavoritePlaces/FavoriteContainer'

export default (
<Route path='/' component={AppContainer} queries={GoogleQuery}>
  <IndexRoute component={FavoriteContainer} queries={GoogleQuery} />
<Route path='/signup' component={SignupComponent} />
<Route path='/login' component={LoginComponent} />
<Redirect from='*' to='/' />
  </Route>
);

