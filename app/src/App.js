import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RepSearch from './RepSearch';
import Profile from './Profile';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={RepSearch}/>
          <Route path="/rep" exact component={Profile}/>
        </div>
      </Router>
    );
  }
}

export default AppRouter;