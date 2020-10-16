//@flow
import React, { Component } from 'react';
import _ from 'lodash';
import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {
  getUserGameCollection
} from "../../actions/game_collection_actions";

import withAuthorization from '../Session/withAuthorization';

import IsotopeList from "../IsotopeList";
import SwitchPrivacyGameCollection from "../SwitchPrivacyGameCollection";

type Props = {
  user_games: {
    game_collection : {}
  },
  user_state: {
    user_authed: {
      uid:number
    }
  },
  getUserGameCollection : (uid:number) => mixed
};


class HomePage extends Component<Props,{}> {
  constructor(props) {
    super(props);
    this.state = {
      user_games : null
    };  
  }

  componentDidMount() {
    this.props.getUserGameCollection(this.props.user_state.user_authed.uid);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <p>Collection ID "{_.has(this.state.user_games,"game_collection") && this.state.user_games.game_collection.getUserId()}"</p>
        <p>This collection is "{_.has(this.state.user_games,"game_collection") && this.state.user_games.game_collection.getIsPublic() ? "Public" : "Private"}"</p>
        <SwitchPrivacyGameCollection/>
        {_.has(this.state.user_games,"game_collection") && <IsotopeList isoGames={this.state.user_games.game_collection} editable_items={true}/>}  
      </div>
    );  
  }

  componentDidUpdate(prevProps) {
    if(prevProps.user_games !== this.props.user_games) {
      this.setState({user_games: this.props.user_games});
    }
  }
}

const authCondition = (authUser) => !!authUser;

const mapStateToProps = state => ({
  user_state: state.user,
  user_games : state.game_collection,
  "i18n" : state.i18n
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserGameCollection
    },
    dispatch
  );

export default withAuthorization(authCondition)(connect(mapStateToProps,mapDispatchToProps)(HomePage));