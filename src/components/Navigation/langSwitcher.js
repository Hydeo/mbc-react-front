import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import React, { Fragment } from "react";
import i18n from "i18next";

class LangSwitcher extends React.Component {
  render() {
    return (
      <ReactFlagsSelect onSelect={this.onLangSwitch} countries={["US", "FR", "DE"]} showOptionLabel={false} showSelectedLabel={false} defaultCountry="FR" placeholder=""/>
    );
  }

  onLangSwitch(selectedLang) {
    console.log(selectedLang);
    var qdz = i18n.changeLanguage(selectedLang);
    console.log(qdz);
  }
}

export default LangSwitcher;
