import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sign_out_user } from "../../actions/user_actions";

class SignOutButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button type="button" onClick={this.props.sign_out_user}>
        Sign Out
      </button>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    sign_out_user,
  },
  dispatch);


export default connect(
  null,
  mapDispatchToProps
)(SignOutButton);
