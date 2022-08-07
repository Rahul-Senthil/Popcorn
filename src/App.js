import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Review from './components/ReviewPage';
import NotFound from './components/NotFound';
import LikedMovies from './components/LikedMovies';
import Account from './components/Account';
import './App.css';
// import Login from './components/Login';
// import Register from './components/Register';
// import Cars from './components/Register';
import Practice from './components/Practice';
// import history from 'history';



function App() {
  return (
    <div>
      <Navbar />
      {/* <Router history={history}> */}
      <Switch>
      <Route path="/practice" component={Practice} />
        {/* <Route path="/cars" component={Cars} /> */}
        <Route path="/account" component={Account} />
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/register" component={Register} /> */}
        <Route path="/liked-movies" component={LikedMovies} />
        <Route path="/review" component={Review} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/account" component={Account} />
        <Redirect from="/" exact to="/review" />
        <Redirect to="/not-found" />
      </Switch>
      {/* </Router> */}
    </div>
  );
}

export default App;
