import $ from "jquery";
import Isotope from "isotope-layout";
import ImagesLoaded from "imagesloaded";
import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { update_isotope, set_isotope } from "../../actions/basic_actions";
import SilentCatch from "../ErrorHandling/SilentCatch";

import ConfirmDialog from "../../components/ConfirmDialog";
import { conf_dev } from "../../config";
import Utils from "../../utils.js";
import LinkCard from "../LinkCards";
import GameCard from "../GameCard";
const class_name = "LinkList";

const link_gutter = {
  width: "3%"
};

const itemListStyle={
  
}


class LinkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_render: true,
      isotope_instance: null,
      link_size_state: {
        width: Utils.calculateIsotopeItemWidth(3) + "%"
      },
      confirm_dialog_state: {
        title: "",
        description: "",
        open: false,
        agree_callback: null,
        desagree_callback: null
      }
    };
  }

  update_confirm_dialog_state = newState => {
    this.setState({ confirm_dialog_state: newState });
  };

  updateDimensions = () => {
    if (!this.state.first_render) {
      //TODO : Debounce ?
      this.setState({
        link_size_state: {
          width: Utils.calculateIsotopeItemWidth(3) + "%"
        }
      });
    }
  };


  render() {
    const { classes } = this.props;

    return (
      <div id="link_list" style={itemListStyle}>
        <div style={this.state.link_size_state} className="link_sizer" />
        <div style={link_gutter} className="link_gutter" />

        {!!this.props.hydrated_game_list &&
          this.props.hydrated_game_list.gameList.map(

            (link, index) => {
              //console.log(link);
              
              return (
              
              /*<LinkCard
                key={index}
                link_data={link}
                game_mask={
                  ( this.props.hydrated_game_list.hasOwnProperty("gameMask") && this.props.hydrated_game_list.gameMask.hasOwnProperty(link._id) )? this.props.hydrated_game_list.gameMask[link._id] : null
                }
                isotopeUpdate={this.update_isotope}
                cardSize={this.state.link_size_state}
                update={this.update_confirm_dialog_state}
              />*/
              <GameCard game_data={link} />
            )}
          )}

        <ConfirmDialog
          parentState={this.state.confirm_dialog_state}
          update={this.update_confirm_dialog_state}
        />
      </div>
    );


  }

  componentDidMount = () => {
    // console.log("--[" + class_name + "] componentDidMount--");
    window.addEventListener("resize", this.updateDimensions);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    /*console.log(
      "--[" +
        class_name +
        "] componentDidUpdate -- first_render: " +
        this.state.first_render
    );*/
    //console.log(this.props);

    if (this.state.first_render == true) {
      this.setState({ first_render: false });
      this.props.update_isotope(this.props.isotope_instance, true);
    } else {
      this.props.update_isotope(this.props.isotope_instance);
    }
  };
}

//On recupere la tate dans les props
const mapStateToProps = (state, ownProps) => ({
  isotope_instance: state.collection_isotope.isotope_instance,
  hydrated_game_list: ownProps.hydrated_game_list
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update_isotope,
      set_isotope
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkList);
