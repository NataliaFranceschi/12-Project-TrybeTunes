import React from 'react';
import TrybeTunesLogin from '../TrybeTunesLogin.png';
import '../styles/notFound.scss';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="notFound">
        <img src={ TrybeTunesLogin } alt="TrybeTunesLogo" />
        <div>
          <span>Ops!</span>
          <p>A página que você está procurando não foi encontrada.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
