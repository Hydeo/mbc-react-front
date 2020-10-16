import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 
  signInUserFacebook
} from "../../actions/user_actions";

class FbLogin extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{"display": "table"}} onClick={this.props.signInUserFacebook}>
				<button className="loginBtn loginBtn--facebook">
					Login with Facebook
				</button>
			</div>

		)
	}

	componentDidMount(){
		/*window.fbLoaded.promise.then(() => {
		  window.FB.XFBML.parse()
		})*/
	}
}

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signInUserFacebook
    },
    dispatch
  );


export default connect(
    null,
    mapDispatchToProps
  )(FbLogin)