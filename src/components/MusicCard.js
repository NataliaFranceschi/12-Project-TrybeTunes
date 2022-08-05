import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const { musics, handleChange, checkedFavorite } = this.props;
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
              <label htmlFor={ music.trackId }>
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  id={ music.trackId }
                  onChange={ () => handleChange(music) }
                  checked={ checkedFavorite(music) }
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
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  checkedFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
