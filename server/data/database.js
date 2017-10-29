// @flow
import DataLoader from 'dataloader';

class GooglePlaces {
  id: string;
  favorite: Array<any>;
  constructor(id: string, favorite: Array<any>) {
    this.id = id;
    this.favorite = favorite;
  }
}

class FavoritePlace {
  id: string;
  place: string;
  isFavorite: boolean;
  constructor(id: string, place: string, isFavorite: boolean) {
    this.id = id;
    this.place = place;
    this.isFavorite = isFavorite;
  }
}

const favorite = [
  new FavoritePlace('1', 'France', true),
  new FavoritePlace('2', 'Belarus', true),
  new FavoritePlace('3', 'Portugal', true),
];

const google = new GooglePlaces('1', favorite.map(place => place.id));

function fetchGoogle(id) {
  return new Promise((resolve) => {
    resolve(getGoogle(id));
});
}

function fetchFavorite(id) {
  return new Promise((resolve) => {
    resolve(getFavorite(id));
});
}

function getFavorite(id) {
  return favorite.find(fav => fav.id === id);
}

function removeFavorite(place) {
  let removableItem = favorite.findIndex(place);
  if (removableItem >= 0) {
    favorite.splice(removableItem, 1);
  }
  return favorite.find(fav => fav.place === place);
}

function getFavorites() {
  return favorite;
}

function getGoogle(id: string) {
  return id === google.id ? google : null;
}

const googleLoader = new DataLoader(
  id => Promise.all(id.map(fetchGoogle))
);

const favoriteLoader = new DataLoader(
  id => Promise.all(id.map(fetchFavorite))
);

export {
  favoriteLoader,
  googleLoader,
  GooglePlaces,
  FavoritePlace,
  getFavorites,
  removeFavorite,
};
