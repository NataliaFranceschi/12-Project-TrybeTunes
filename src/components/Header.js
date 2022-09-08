import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import '../styles/header.scss';
import TrybeTunesHeader from '../TrybeTunesHeader.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
      image: '',
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
          image: resposta.image,
        });
      },
    );
  }

  userName = () => {
    const { user, image } = this.state;
    return (
      <div className="user">
        { image === ''
          ? <FaUserCircle />
          : <img data-testid="profile-image" src={ image } alt={ user } />}
        <p data-testid="header-user-name">{user}</p>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="header-component" className="mainHeader">
        <div className="header">
          <img src={ TrybeTunesHeader } alt="TrybeTunesLogo" />
          {loading ? <span>Carregando...</span>
            : this.userName()}
        </div>
        <nav>
          <NavLink
            data-testid="link-to-search"
            to="/12-Project-TrybeTunes/search"
            className={ (isActive) => (isActive ? 'bgGreen' : 'bgColor') }
          >
            Procurar

          </NavLink>
          <NavLink
            data-testid="link-to-favorites"
            to="/12-Project-TrybeTunes/favorites"
            className={ (isActive) => (isActive ? 'bgGreen' : 'bgColor') }
          >
            Favoritos

          </NavLink>
          <NavLink
            data-testid="link-to-profile"
            to="/12-Project-TrybeTunes/profile"
            className={ (isActive) => (isActive ? 'bgGreen' : 'bgColor') }
          >
            Perfil

          </NavLink>
        </nav>
      </div>
    );
  }
}

export default Header;
