import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorite();
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

    render() {
      const { musics } = this.props;
      const { loading } = this.state;
      if (loading) return <Loading />;
      return (
        <div>
          <ul>
            {musics.map((music, index) => (
              <li key={ index }>
                <p>{music.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="favorita">
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    id={ music.trackId }
                    onChange={ () => this.handleChange(music) }
                    checked={ this.checkedFavorite(music) }
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      );
    }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired };

export default MusicCard;
