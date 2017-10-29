// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button, List, ListItem } from 'react-mdl';
import MdStar from 'react-icons/lib/md/star';

import FavoriteItem from './FavoriteItem';

export default class Favorite extends React.Component {

  static PropTypes = {
    google: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <Grid>
          <Cell col={6}>
            <Card shadow={0}>
              <CardTitle>
                <h3 style={{padding: '0', margin: '0'}}>
                  My Favorites
                  <MdStar style={{color: 'rgba(243, 156, 18,1.0)'}}/>
                </h3>
              </CardTitle>
              <List>
                {this.props.google.favorite.edges.map((place) => {
                  return (
                    <ListItem key={place.node.id}>
                      <FavoriteItem node={place.node} relay={this.props.relay} google={this.props.google}/>
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Cell>
        </Grid>
      </div>
    );
  }
}
