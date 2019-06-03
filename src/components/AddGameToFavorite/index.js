import React, { Fragment } from 'react';
import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {
    toggle_in_collection
  } from "../../actions/game_collection_actions";

class AddGameToFavorite extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active_game: this.props.active_game
          };
    }

    handleClick = () =>{
        alert("click");
        this.props.toggle_in_collection(this.state.active_game);
    }

    render(){
        return(
            <Fragment>
                <div onClick={this.handleClick}>&#9825;</div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            toggle_in_collection
        },
        dispatch
    );

export default connect(null,mapDispatchToProps)(AddGameToFavorite);