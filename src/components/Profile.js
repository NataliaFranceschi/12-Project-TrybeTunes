import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userInformation: undefined,
    };
  }

  componentDidMount = () => {
    this.setState(
      { loading: true },
      async () => {
        const resposta = await getUser();
        this.setState({
          loading: false,
          userInformation: resposta,
        });
      },
    );
  }

  information = () => {
    const { userInformation } = this.state;
    if (userInformation !== undefined) {
      const { name, email, image, description } = userInformation;
      return (
        <div>
          <img data-testid="profile-image" src={ image } alt={ name } width={ 200 } />
          <p>{name}</p>
          <p>{email}</p>
          <p>{description}</p>
        </div>
      );
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading />
          : this.information()}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
