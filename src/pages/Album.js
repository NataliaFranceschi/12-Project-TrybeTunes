import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/album.scss';
import Loading from '../components/Loading';

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
        <div className="album">
          <div className="albumInformation">
            <img
              src={ albumInformation.artworkUrl100.replace('100x100bb', '1000x1000bb') }
              alt={ albumInformation.collectionName }
            />
            <p data-testid="album-name">
              {albumInformation.collectionName}
            </p>
            <p data-testid="artist-name">
              {albumInformation.artistName}
            </p>
          </div>
          <div className="albumMusics">
            <MusicCard
              { ...this.state }
              checkedFavorite={ this.checkedFavorite }
              handleChange={ this.handleChange }
            />
          </div>
        </div>
      );
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>{loading ? <Loading /> : this.Card()}</section>
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
