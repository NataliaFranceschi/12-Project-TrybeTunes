import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      artist: '',
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

  render() {
    const { isDisabled, artist } = this.state;
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
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
