import React from 'react';
import Header from './Header';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      musics: [],
      favorites: [],
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const resposta = await getFavoriteSongs();
        this.setState({
          musics: [...resposta],
          favorites: [...resposta],
          loading: false,
        });
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
          musics: [...resposta],
          loading: false,
        });
      },
    );
  }

    handleChange = async (music) => {
      const isFavorite = this.checkedFavorite(music);
      if (isFavorite) {
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
      const { loading } = this.state;
      if (loading) return <Loading />;
      return (
        <div data-testid="page-favorites">
          <Header />
          <MusicCard
            { ...this.state }
            checkedFavorite={ this.checkedFavorite }
            handleChange={ this.handleChange }
          />
        </div>
      );
    }
}

export default Favorites;
