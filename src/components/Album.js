import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInformation: undefined,
      loading: false,
      musics: [],
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
        });
      },
    );
  }

  Card = () => {
    const { albumInformation, musics } = this.state;
    if (albumInformation !== undefined) {
      return (
        <div>
          <p data-testid="artist-name">
            {albumInformation.artistName}
          </p>
          <p data-testid="album-name">
            {albumInformation.collectionName}
          </p>
          <MusicCard musics={ musics } />
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
