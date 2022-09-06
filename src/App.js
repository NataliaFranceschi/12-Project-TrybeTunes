import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/12-Project-TrybeTunes/" component={ Login } />
          <Route exact path="/12-Project-TrybeTunes/search" component={ Search } />
          <Route exact path="/12-Project-TrybeTunes/album/:id" component={ Album } />
          <Route exact path="/12-Project-TrybeTunes/favorites" component={ Favorites } />
          <Route exact path="/12-Project-TrybeTunes/profile" component={ Profile } />
          <Route exact path="/12-Project-TrybeTunes/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
