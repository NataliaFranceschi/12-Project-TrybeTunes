import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      artist: '',
      loading: false,
      albums: [],
      searchArtist: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      artist: target.value }, () => {
      const MIN_CHARACTERS = 2;
      const isValid = target.value.length < MIN_CHARACTERS;
      this.setState({ isDisabled: isValid });
    });
  }

  handleSearchButton = () => {
    const { artist } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const resposta = await searchAlbumsAPI(artist);
        this.setState({
          albums: [...resposta],
          loading: false,
          searchArtist: artist,
          artist: '',
        });
      },
    );
  }

  searchResult = () => {
    const { albums, searchArtist } = this.state;
    if (searchArtist !== '') {
      return (
        <div>
          <span>
            {albums.length !== 0
              ? `Resultado de álbuns de:
            ${searchArtist}` : 'Nenhum álbum foi encontrado'}
          </span>
          <ul>
            {albums.map((album, index) => (
              <li key={ index }>
                {album.collectionName}
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `album/${album.collectionId}` }
                >
                  Ver Álbum
                </Link>
              </li>
            ))}
          </ul>
        </div>);
    }
  }

  render() {
    const { isDisabled, artist, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="artist">
          <input
            data-testid="search-artist-input"
            type="text"
            value={ artist }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleSearchButton }
        >
          Pesquisar

        </button>
        <span data-testid="header-user-name">
          {loading ? 'Carregando...' : this.searchResult()}
        </span>
      </div>
    );
  }
}

export default Search;
