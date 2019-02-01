import React, { Component } from 'react';

import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {
  get_categories_by_lang,
  get_mecanics_by_lang
} from "../../actions/state_init_actions";


class AppStateInit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };  
    }
  
    componentDidMount() {
      this.props.get_categories_by_lang();
    }
  
    render() {
      console.log(" -- App Init --");
      console.log(console.log(this.props.categories));
      return null ;  
    }
  }
  
  
  const mapStateToProps = state => ({
    categories: state.state_init,
    user_games : state.game_collection
  });
  
  //On injecte les actions possible au props ?
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        get_categories_by_lang
      },
      dispatch
    );
  
  export default connect(mapStateToProps,mapDispatchToProps)(AppStateInit);