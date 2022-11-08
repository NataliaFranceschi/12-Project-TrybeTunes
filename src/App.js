import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

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
          <Route
            exact
            path="/12-Project-TrybeTunes/profile/edit"
            component={ ProfileEdit }
          />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
