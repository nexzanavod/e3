import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Container } from 'reactstrap';
import {
  AppHeader,
  AppSidebar,
  AppSidebarHeader,
  AppSidebarNav
} from '@coreui/react';
import Footer from './Footer';
import Header from './Header';
import routes from '../config/routes';
import navigation from '../config/navigation';

class Home extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
        </AppHeader>
        <div className="app-body">
          <AppSidebar className="bg-light text-dark" fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarNav style={{ paddingBottom: 40 }} navConfig={navigation} {...this.props} />
            <Footer />
          </AppSidebar>
          <main className="main">
            <Container fluid className="px-0">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                    : (null);
                },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default Home;
