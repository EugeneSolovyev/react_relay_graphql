/* eslint-disable no-unused-vars */
// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import App from './AppComponent';
import Favorite from '../FavoritePlaces/FavoriteContainer'

export default createFragmentContainer(App, {
  google: graphql`
    fragment AppContainer_google on Google {
      ...Favorite_google
    }`
});
