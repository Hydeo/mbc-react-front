import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 
  signInUserGoogle
} from "../../actions/user_actions";

class GoogleLogin extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{"display": "table"}} onClick={this.props.signInUserGoogle}>
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
      signInUserGoogle
    },
    dispatch
  );


export default connect(
    null,
    mapDispatchToProps
  )(GoogleLogin)