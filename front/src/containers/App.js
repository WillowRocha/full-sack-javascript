import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import withService from '../utils/withService';
import Service from '../services/default.service';
import TodoLoadable from './TodoLoadable';
import AboutLoadable from '../component/AboutLoadable';
import Nav from '../component/Nav';

const serviceLists = new Service('lists');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    serviceLists.fetchAll().then(lists => this.setState({ lists }));
  }

  renderDefaultRoute(list, service) {
    return <Route key={`${list.name}-default`} path={`/`} exact component={withService(service, list.title)(TodoLoadable)} />;
  }

  renderListRoutes(list) {
    const service = new Service(list.name);
    return <Route key={list.name} path={`/${list.name}`} exact component={withService(service, list.title)(TodoLoadable)} />;
  }

  render() {
    return (
      <BrowserRouter>
        <div className="row">
          <div className="col-md-3">
            <Nav lists={this.state.lists} />
          </div>
          <div className="col-md-9">
            <Switch>
              <Route path="/about" exact component={AboutLoadable} />
              {this.state.lists.map(this.renderListRoutes.bind(this))}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
