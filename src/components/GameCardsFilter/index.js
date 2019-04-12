import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { update_isotope, set_isotope } from "../../actions/basic_actions";
import Chip from '@material-ui/core/Chip';

class GameCardsFilter extends React.Component {

    constructor(props) {
        super(props);
        
        var tags_array = props.tags.map((tag, i)=>{
            console.log(tag);
            return tag.tagName;
        })
        console.log(tags_array);
        this.state = {
            tags: tags_array,
            activeFilters: ""
        }
    }

    onChipClick = filterName => () => {

        var newFilters = this.state.activeFilters;
        if (this.state.activeFilters.includes("." + filterName)) {
            newFilters = newFilters.replace("." + filterName, "");
        }
        else {
            newFilters += "." + filterName;
        }
        console.log(newFilters);

        var splitFilters = newFilters.substring(1,newFilters.length).split(".");

        console.log(splitFilters);
        
        this.props.isotope_instance.arrange({
            // item element provided as argument
            filter: function (itemElem) {
                var itemClassName = itemElem.className;
                var showItem = true;
                for(var i = 0 ; i < splitFilters.length ; i++){
                   //console.log(filter +"-"+itemClassName.includes(filter)+ "=>"+  itemClassName);
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

    renderChips = (filterName) => {
        return (
            <Chip
                label={filterName}
                href="#chip"
                onClick={this.onChipClick(filterName)}
                clickable
            />
        )
    }

    render() {
        return (
            <Fragment>
                <button onClick={() => {
                    this.props.isotope_instance.arrange({
                        // item element provided as argument
                        filter: function (itemElem) {
                            return itemElem.className.includes('.1.');
                        }
                    });
                }}>
                    Filter Component
              </button>

                {this.state.tags.map(
                    (item, index) => {
                        return (this.renderChips(item));
                    }
                )}

            </Fragment>

        );
    }

}



//On recupere la state dans les props
const mapStateToProps = (state, ownProps) => ({
    isotope_instance: state.collection_isotope.isotope_instance,
    hydrated_game_list: ownProps.hydrated_game_list,
    tags : state.tags
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
