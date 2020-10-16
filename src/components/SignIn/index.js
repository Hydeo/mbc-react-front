import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 
  signInUser
} from "../../actions/user_actions";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
//import { auth } from "../../firebase";
import * as routes from "../../constants/routes";
import FbLogin from "./fbLogin";
import GoogleLogin from "./googleLogin";

class SignInPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //SignInPage is the component connected to redux so we pass the user state to SignInForm through it.
    return (
      <div>
        <h1>SignIn</h1>
        <SignInForm history={this.props.history} parentProps={this.props} />
        <GoogleLogin/>
        <FbLogin/>
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    );
  }
}

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    this.props.parentProps
      .signInUser({ email: email, password: password })
      .then((arg) => {
        this.setState(() => ({ ...INITIAL_STATE }));
        if(this.props.parentProps.user_state.authenticated)
          history.push(routes.HOME);
      });
    /*auth.doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setAuthUser(authUser);
        
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });
    */
    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;

    const isInvalid = password === "" || email === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event =>
            this.setState(updateByPropertyName("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event =>
            this.setState(updateByPropertyName("password", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {this.props.parentProps.user_state.error_type.sign_in_error && (
          <p>{this.props.parentProps.user_state.error_type.sign_in_error}</p>
        )}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user_state: state.user
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signInUser
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInPage)
);

export { SignInForm };
