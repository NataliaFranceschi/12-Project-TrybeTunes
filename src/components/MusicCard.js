import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Loading from './Loading';
import '../styles/musicCard.scss';

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
        <ul className="musics">
          {musics.map((music, index) => (
            <li key={ index }>
              <span className="artist">{`${music.artistName} - `}</span>
              <span>{music.trackName}</span>
              <div className="music">
                <img
                  src={ music.artworkUrl100.replace('100x100bb', '1000x1000bb') }
                  alt={ music.collectionName }
                />
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
                { checkedFavorite(music) ? <AiFillHeart
                  id={ music.trackId }
                  onClick={ () => handleChange(music) }
                /> : <AiOutlineHeart
                  id={ music.trackId }
                  onClick={ () => handleChange(music) }
                />}
              </div>
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
