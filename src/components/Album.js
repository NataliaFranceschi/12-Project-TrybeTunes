import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInformation: undefined,
      loading: false,
      musics: [],
      favorites: [],
    };
  }

  componentDidMount = () => {
    this.setState(
      { loading: true },
      async () => {
        const { match: { params: { id } } } = this.props;
        const resposta = await getMusics(id);
        const musics = resposta
          .filter(({ kind }) => kind === 'song');
        this.setState({
          albumInformation: resposta[0],
          loading: false,
          musics: [...musics],
        }, this.getFavorite());
      },
    );
  }

  getFavorite = () => {
    this.setState(
      { loading: true },
      async () => {
        const resposta = await getFavoriteSongs();
        this.setState({
          favorites: [...resposta],
          loading: false,
        });
      },
    );
  }

    handleChange = async (music) => {
      const isFavorite = this.checkedFavorite(music);
      if (!isFavorite) {
        this.setState({ loading: true },
          async () => {
            await addSong(music);
            this.setState({ loading: false });
          });
      } else {
        this.setState({ loading: true },
          async () => {
            await removeSong(music);
            this.setState({ loading: false });
          });
      } this.getFavorite();
    }

    checkedFavorite = (music) => {
      const { favorites } = this.state;
      return favorites.some((favorite) => favorite.trackId === music.trackId);
    }

  Card = () => {
    const { albumInformation } = this.state;
    if (albumInformation !== undefined) {
      return (
        <div>
          <p data-testid="artist-name">
            {albumInformation.artistName}
          </p>
          <p data-testid="album-name">
            {albumInformation.collectionName}
          </p>
          <MusicCard
            { ...this.state }
            checkedFavorite={ this.checkedFavorite }
            handleChange={ this.handleChange }
          />
        </div>
      );
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>{loading ? 'Carregando...' : this.Card()}</section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired };

export default Album;
