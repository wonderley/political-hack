import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RepSearch from './RepSearch';
import Rep from './Rep';

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
          <Route path="/rep/:name" component={Rep}/>
        </div>
      </Router>
    );
  }
}

export default AppRouter;