// @flow
/* eslint-disable no-unused-vars, no-use-before-define */
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import {
  favoriteLoader,
  googleLoader,
  GooglePlaces,
  FavoritePlace,
  getFavorites,
  removeLoader,
} from './database';


/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
  const { type, id } = fromGlobalId(globalId);
if (type === 'Google') {
  return googleLoader.load(id);
} else if (type === 'Favorite') {
  return favoriteLoader.load(id);
}
return null;
},
(obj) => {
  if (obj instanceof GooglePlaces) {
    return googleType;
  } else if (obj instanceof FavoritePlace) {
    return favoriteType;
  }
  return null;
}
);

/**
 * Define your own types here
 */

const googleType = new GraphQLObjectType({
  name: 'Google',
  description: 'Google API',
  fields: () => ({
  id: globalIdField('Google'),
  favorite: {
    type: favoriteConnection,
    description: 'Favorite place that I have',
    args: connectionArgs,
    resolve: (source, args) => connectionFromPromisedArray(favoriteLoader.loadMany(source.favorite), args)
},
}),
interfaces: [nodeInterface]
});

const favoriteType = new GraphQLObjectType({
  name: 'Favorite',
  description: 'Favorite places from Google API',
  fields: () => ({
  id: globalIdField('Favorite'),
  place: {
    type: GraphQLString,
    description: 'Name of favorite place'
  },
  isFavorite: {
    type: GraphQLBoolean,
    description: 'Is favorite place?',
  }
}),
  interfaces: [nodeInterface]
});

/**
 * Define your own connection types here
 */

const { connectionType: favoriteConnection, edgeType: favoriteEdge } = connectionDefinitions({ name: 'Favorite', nodeType: favoriteType});

/**
 * Create feature example
 */

const removeFavoriteMutation = mutationWithClientMutationId({
  name: 'RemoveFavorite',
  inputFields: {
    place: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    favoriteEdge: {
      type: favoriteEdge,
      resolve: (obj) => {
      const cursorId = cursorForObjectInConnection(getFavorites(), obj);
return { node: obj, cursor: cursorId };
}
},
google: {
  type: googleType,
    resolve: () => googleLoader.load('1')
}
},

mutateAndGetPayload: ({ place }, args) => connectionFromPromisedArray(removeLoader.load(place), args),
});

const addFavoriteMutation = mutationWithClientMutationId({
  name: 'AddFavorite',
  inputFields: {
    place: { type: new GraphQLNonNull(GraphQLString) },
    isFavorite: { type: new GraphQLNonNull(GraphQLBoolean) }
  },

  mutateAndGetPayload: ({ place, isFavorite }) => addFavorite(place, isFavorite),

  outputFields: {
  favoriteEdge: {
    type: favoriteEdge,
      resolve: (obj) => {
      const cursorId = cursorForObjectInConnection(getFavorites(), obj);
      return { node: obj, cursor: cursorId };
    }
  },
  google: {
    type: googleType,
      resolve: () => googleLoader.load('1')
  }
}
});


/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
  node: nodeField,
  // Add your own root fields here
  google: {
    type: googleType,
    resolve: () => googleLoader.load('1')
}
})
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
  // addFavorite: addFavoriteMutation,
  removeFavoriteItem: removeFavoriteMutation,
})
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
