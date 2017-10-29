import Relay from 'react-relay/classic';

export default {
  google: Component => Relay.QL`
    query {
      google {
        ${Component.getFragment('google')}
      }
    }
  `
};
