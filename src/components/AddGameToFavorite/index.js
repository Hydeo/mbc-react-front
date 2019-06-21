import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    toggle_in_collection
} from "../../actions/game_collection_actions";

class AddGameToFavorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_in_user_collec : false,
            active_game: this.props.active_game
        };
    }

    isGameInCollection = () =>{
        if(this.props.game_collection.game_collection != null){
            for(var i = 0 ; i < this.props.game_collection.game_collection.gameList.length ; i++){
                if(this.props.game_collection.game_collection.gameList[i]._id == this.state.active_game._id){
                    return ("Yes")
                }
            };
        }
        return ("No")
    }
    handleClick = () => {
        this.props.toggle_in_collection(this.state.active_game);
    }

    render() {
        console.log("fav render");
        return (
            <Fragment>
                <div onClick={this.handleClick}>
                    ={this.isGameInCollection()}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    game_collection: state.game_collection
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            toggle_in_collection
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddGameToFavorite);