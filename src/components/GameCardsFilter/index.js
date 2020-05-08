import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { update_isotope, set_isotope } from "../../actions/isotope_actions";
import Chip from '@material-ui/core/Chip';

class GameCardsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeFilters: ""
        }
    }

    onChipClick = filter_value => () => {

        var newFilters = this.state.activeFilters;
        if (this.state.activeFilters.includes("." + filter_value)) {
            newFilters = newFilters.replace("." + filter_value, "");
        }
        else {
            newFilters += "." + filter_value;
        }

        var splitFilters = newFilters.substring(1,newFilters.length).split(".");
        
        this.props.isotope_instance.arrange({
            // item element provided as argument
            filter: function (itemElem) {
                var itemClassName = itemElem.className;
                var showItem = true;
                for(var i = 0 ; i < splitFilters.length ; i++){
                    if (itemClassName.includes(splitFilters[i]) == false){
                        showItem = false;
                        break;
                    }
                }
                return showItem;
            }
        });


        this.setState({ activeFilters: newFilters });
    }

    renderChips = (filter_name,filter_value) => {
        // We use filter_name = localized and filter_value = english in hope that changing the language won't re-render the 
        // isotope grid
        return (
            <Chip
                label={filter_name}
                key={filter_name}
                href="#chip"
                onClick={this.onChipClick(filter_value)}
                clickable
            />
        )
    }

    render() {

        const filters_chip_renderer = this.props.tags.map(function(e, index){
                return this.renderChips(e.localization[this.cur_lang].trad,e.tagName);
        }
        ,{"cur_lang":this.props.i18n.cur_lang,"renderChips":this.renderChips})

        return (
            <Fragment>
                {filters_chip_renderer}
            </Fragment>

        );
    }

}



//On recupere la state dans les props
const mapStateToProps = (state, ownProps) => ({
    isotope_instance: state.isotope.isotope_instance,
    hydrated_game_list: ownProps.hydrated_game_list,
    tags : state.tags,
    "i18n" : state.i18n
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
)(GameCardsFilter);
