import React, { Component } from 'react';

import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {
  get_game_library
} from "../../actions/game_actions";

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

import LinkList from "../LinkList";

class GameLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
   
  }

  componentDidMount() {
    this.props.get_game_library();
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by all the users .</p>
        <LinkList hydrated_game_list={this.props.game_library}/>
      </div>
     
    );  
  }
}

const authCondition = (authUser) => !!authUser;

const mapStateToProps = state => ({
  user_state: state.user,
  game_library : state.game_library
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_game_library
    },
    dispatch
  );

export default withAuthorization(authCondition)(connect(mapStateToProps,mapDispatchToProps)(GameLibrary));