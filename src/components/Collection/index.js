import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import {
    getGameCollectionById
} from "../../actions/game_collection_actions";
import _ from 'lodash';
import IsotopeList from "../IsotopeList";
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';



class Collection extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            idCollection : this.props.match.params.idCollection
        };
    }

    componentDidMount() {
        this.props.getGameCollectionById(this.state.idCollection);
    }

    render() {
        return (
            <div>
                <p>Public collection : {this.state.idCollection}</p>
                {!_.isUndefined(this.props.publicCollection) && <IsotopeList isoGames={this.props.publicCollection}/>}
            </div>
        );
    }
}

const authCondition = (authUser) => !!authUser;

const mapStateToProps = state => ({
    user_state: state.user,
    publicCollection: state.game_collection.publicCollection,
    i18n: state.i18n
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
    bindActionCreators({
            getGameCollectionById
        },
        dispatch
    );

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Collection)));