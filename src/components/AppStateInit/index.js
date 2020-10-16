import React, { Component } from 'react';

import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {
  getCategoriesByLang,
} from "../../actions/state_init_actions";
import {
  getAllTags,
} from "../../actions/tag_actions";


class AppStateInit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };  
    }
  
    componentDidMount() {
      this.props.getCategoriesByLang();
      this.props.getAllTags();
    }
  
    render() {
      console.log(" -- App Init --");
      console.log(console.log(this.props));
      return null ;  
    }
  }
  
  
  const mapStateToProps = state => ({
    categories: state.state_init,
    user_games : state.game_collection,
    tags : state.tags
  });
  
  //On injecte les actions possible au props ?
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getCategoriesByLang,
        getAllTags
      },
      dispatch
    );
  
  export default connect(mapStateToProps,mapDispatchToProps)(AppStateInit);