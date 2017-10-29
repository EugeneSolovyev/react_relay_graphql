// @flow
import {
  createFragmentContainer,
  graphql
} from 'react-relay/compat';

import Favorite from './FavoriteComponent';

export default createFragmentContainer(Favorite, {
  google: graphql`
    fragment FavoriteContainer_google on Google {
      id,
      favorite(first:20) {
        edges {
          node {
            id,
            place,
            isFavorite,
          }
        }
      }
    }
  `
});
