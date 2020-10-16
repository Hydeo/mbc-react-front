import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import AppStateInit from "../AppStateInit";
import ErrorBoundary from '../ErrorHandling';
import Footer from '../Footer';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import CreateGamePage from '../CreateGame';
import GameLibraryPage from '../GameLibrary';
import CreateMaskPage from '../MaskEditor';
import Collection from '../Collection';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';
import { withStyles } from '@material-ui/core/styles';

import './index.css';

const styles = theme => ({
    appContainer: {
      position: "relative",
      minHeight: "100vh"
    },
    contentWrap:{
      paddingBottom: "10rem" /*Footer padding*/
    }

});

class App extends React.Component{
  render() {
    const {classes} = this.props;
    return(
      <Router>
        <div className={classes.appContainer}>
          <div className={classes.contentWrap}>
            <AppStateInit/>
            <Navigation>
              <hr/>
                <ErrorBoundary>
                  <Route exact path={routes.LANDING} component={() => <LandingPage />} />
                  <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
                  <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
                  <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
                  <Route exact path={routes.CREATE_GAME} component={() => <CreateGamePage/>} />
                  <Route exact path={routes.HOME} component={() => <HomePage />} />
                  <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
                  <Route exact path={routes.GAME_LIBRARY} component={() => <GameLibraryPage />} />
                  <Route exact path={routes.CREATE_MASK} component={(props) => <CreateMaskPage {...props}/>} />
                  <Route exact path={routes.COLLECTION + "/:idCollection"} component={(props) => <Collection/>} />
                </ErrorBoundary>
              <hr/>
            </Navigation>
          </div>
          <Footer/>
        </div>
      </Router>
      );
  }
}

export default withAuthentication(withStyles(styles)(App));