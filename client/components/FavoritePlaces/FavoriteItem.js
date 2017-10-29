import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button, List, ListItem } from 'react-mdl';
import MdStar from 'react-icons/lib/md/star';

import RemoveFavoriteMutation from './RemoveFavoriteMutation';

export default class FavoriteItem extends React.Component {

  static PropTypes = {
    google: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
  };

  handleRemoveFavorite = () => {
    let optimistic = this.props.google.favorite.edges.map(fav => {
      if (fav.node.id !== this.props.node.id) {
        return fav.node;
      }
    });
    let data = {
      place: this.props.node.place
    };
    RemoveFavoriteMutation.commit(
      this.props.relay.environment,
      data,
      optimistic,
      this.props.google.id,
    );
  };

  render() {
    let isFavorite = this.props.node.isFavorite ? <MdStar style={{color: 'rgba(243, 156, 18,1.0)'}}/> : false;
    return (
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        {this.props.node.place}
        <Button style={{cursor: 'pointer'}}
                onClick={this.handleRemoveFavorite.bind(this)}>
          {isFavorite}
        </Button>
      </div>
    );
  }
}
