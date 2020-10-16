import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getGameBrowserInitData
} from "../../actions/game_browser_actions";
import IsotopeList from "../IsotopeList";
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';



class GameLibrary extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        this.props.getGameBrowserInitData();
    }

    render() {
        return (
            <div>
                <IsotopeList isoGames={this.props.game_library}/>
            </div>
        );
    }
}

const authCondition = (authUser) => !!authUser;

const mapStateToProps = state => ({
    user_state: state.user,
    game_library: state.game_library,
    i18n: state.i18n
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
    bindActionCreators({
            getGameBrowserInitData
        },
        dispatch
    );

export default (connect(mapStateToProps, mapDispatchToProps)(GameLibrary));