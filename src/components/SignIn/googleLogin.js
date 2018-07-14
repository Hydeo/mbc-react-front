import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 
  sign_in_user_google
} from "../../actions/user_actions";

class GoogleLogin extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{"display": "table"}} onClick={this.props.sign_in_user_google}>
				<button className="loginBtn loginBtn--google">
					Login with Google
				</button>
			</div>

		)
	}

	componentDidMount(){
	}
}

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sign_in_user_google
    },
    dispatch
  );


export default connect(
    null,
    mapDispatchToProps
  )(GoogleLogin)