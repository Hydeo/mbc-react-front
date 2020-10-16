import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOutUser } from "../../actions/user_actions";

class SignOutButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button type="button" onClick={this.props.signOutUser}>
        Sign Out
      </button>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signOutUser,
  },
  dispatch);


export default connect(
  null,
  mapDispatchToProps
)(SignOutButton);
