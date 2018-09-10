import React, { Component } from 'react';

import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {
  get_user_game_collection
} from "../../actions/game_collection_actions";

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

import LinkList from "../LinkList";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {}
    };
    console.log(this.props);
   
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    this.props.get_user_game_collection(this.props.user_state.user_authed.uid);
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> }

        {/*!!this.props.game_collection.game_collection && <GameList game_collection={this.props.game_collection.game_collection}/>*/}
        <LinkList/>
      </div>
     
    );  
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const GameList = ({game_collection})=>
  <div style={{display: "inline-flex"}}>
    { 
      game_collection.gameList.map(function(game){

      var has_mask  = this.hasOwnProperty(game._id); //this == gameMask object passend as this in map function
      var title = game.localization.eng.title;
      var description = (has_mask && this[game._id].comment != null) ? this[game._id].comment : game.localization.eng.description;
      return(
        <div key={game._id}>
          <h2>{game.localization.eng.title}</h2>
          <img src={game.localization.eng.imageUrl} alt="lik"/>
          <p>{description}</p>
        </div>
      )
    }
  , game_collection.gameMask)
  } 
</div>


const authCondition = (authUser) => !!authUser;

const mapStateToProps = state => ({
  user_state: state.user,
  game_collection : state.game_collection
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_user_game_collection
    },
    dispatch
  );

export default withAuthorization(authCondition)(connect(mapStateToProps,mapDispatchToProps)(HomePage));