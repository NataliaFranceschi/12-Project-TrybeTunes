import React from 'react';
import { getUser } from '../services/userAPI';

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
          user: resposta.name,
          loading: false,
        });
      },
    );
  }

  render() {
    const { user, loading } = this.state;

    return (
      <div data-testid="header-component">
        <span data-testid="header-user-name">{loading ? 'Carregando...' : user}</span>
      </div>
    );
  }
}

export default Header;
