// @flow
import { graphql, commitMutation, Environment } from 'react-relay/compat';

const mutation = graphql`
  mutation RemoveFavoriteMutation($input: RemoveFavoriteInput!) {
    removeFavoriteItem(input: $input) {
      favoriteEdge {
        node {
          id
        }
      },
      google {
        id
      }
    }
  }
`;

function getConfigs(viewerId) {
  return [{
    type: 'NODE_DELETE',
    parentName: 'google',
    parentID: viewerId,
    connectionName: 'favoriteEdge',
    deletedIDFieldName: 'removeFavoriteItem'
  }]
}

function getOptimisticResponse(optimistic, viewerId) {
  return {
    removeFavoriteItem: {
      favoriteEdge: {
        edges: optimistic,
      },
      google: {
        id: viewerId
      }
    }
  }
}

function commit(
  environment: Environment,
  data: String,
  optimistic: Array<any>,
  viewerId: number
) {
  commitMutation(
    environment,
    {
      mutation,
      variables: { input: data },
      optimisticResponse: () => getOptimisticResponse(optimistic, viewerId),
      configs: getConfigs(viewerId),
      onCompleted: (response, errors) => {
        console.log('Response received from server.')
      },
      onError: err => console.error(err),
    }
  );
}

export default { commit };
