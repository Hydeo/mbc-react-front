import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    toggleInCollection
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
        if(this.props.userGameCollection.userGameCollection != null){
            for(var i = 0 ; i < this.props.userGameCollection.userGameCollection.gameList.length ; i++){
                if(this.props.userGameCollection.userGameCollection.gameList[i]._id == this.state.active_game._id){
                    return ("\u2764")
                }
            };
        }
        return ("\u2661")
    }
    handleClick = () => {
        this.props.toggleInCollection(this.state.active_game);
    }

    render() {
        return (
            <Fragment>
                <div onClick={this.handleClick}>
                    Favorite : {this.isGameInCollection()}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    userGameCollection: state.userGameCollection
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            toggleInCollection
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddGameToFavorite);