import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount = () => {
    this.setState(
      { loading: true },
      async () => {
        const resposta = await getUser();
        this.setState({
          loading: false,
          user: resposta.name,
        });
      },
    );
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="header-component">
        {loading ? <Loading /> : <p data-testid="header-user-name">{user}</p>}
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
