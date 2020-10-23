import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {
    toggleIsPublicCollection
} from "../../actions/game_collection_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class SwitchPrivacyGameCollection extends React.Component{
  constructor(props){
    super(props);
  }

  handleChange = (event) => {
    this.props.toggleIsPublicCollection();
  };

  render(){
    if(typeof this.props.userCollection.userGameCollection != "undefined" &&  this.props.userCollection.userGameCollection != null){
      return (
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.userCollection.userGameCollection.isPublic}
                onChange={this.handleChange}
                name="isPublic"
                color="primary"
              />
            }
            label="Is Public"
          />
        </FormGroup>
      );
    }
    else{
      return (<div></div>);
    }
    
  }
}

const mapStateToProps = state => ({
    userCollection: state.userGameCollection
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
      {
        toggleIsPublicCollection
      },
      dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(SwitchPrivacyGameCollection);