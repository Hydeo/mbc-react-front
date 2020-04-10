import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import React, { Fragment } from "react";
import i18n from "i18next";

import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {update_cur_lang} from "../../actions/utils_actions"

class LangSwitcher extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <ReactFlagsSelect onSelect={this.onLangSwitch} countries={["GB", "FR", "DE"]} customLabels={{"US": "EN"}} showOptionLabel={false} showSelectedLabel={false} defaultCountry="FR" placeholder=""/>
    );
  }

  onLangSwitch = (selected_lang)=> {
    if(selected_lang == "GB"){
      selected_lang = "EN";
    }
    i18n.changeLanguage(selected_lang);
    this.props.update_cur_lang(selected_lang.toLowerCase());
  }
}



const mapStateToProps = state => ({
  i18n: state.i18n,
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update_cur_lang
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(LangSwitcher);

