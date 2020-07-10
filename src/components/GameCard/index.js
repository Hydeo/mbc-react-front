import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    update_active_game_popup
} from "../../actions/game_cards_actions";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LazyLoad from "react-lazyload";
import Chip from '@material-ui/core/Chip';
import Utils from "../../utils";


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%",
        overflow: 'hidden',
    },
    alignTextItem: {
        display: "flex",
        alignItems: "center"
    }

});


class GameCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            a_chip_height: 32,
            open: false,
            tag_chips_container_height: "100%"
        }
        this.myRef = React.createRef();
    }

    handleClickOpen = () => {

        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    show_game_details = () => {
        this.props.update_active_game_popup({"active_game":this.props.game_data, open:true});
    }

    get_game_filter_tags = () => {
        if(this.props.game_data.tags){
            var tag_string = "";
            this.props.game_data.tags.forEach(t => {
                //For the filters, we use the english version of the tags, whatever is the current lang
                tag_string += " " + t.getTrad();
            });
            return tag_string;
        }
        return "";
    }

    renderTagsChips = (filter_name) => {
        return this.props.game_data.tags.map(function(e,index) {
            try{
                return (
                    <Chip
                        key={index}
                        label={e.localization[this.cur_lang].trad}
                        href="#chip"
                        clickable
                    />
                )
            }catch(error){
                return (
                    <Chip
                        key={index}
                        label={e._id}
                        href="#chip"
                        clickable
                    />
                )
            }
        }, this.props.i18n)

    }

    tagsChipContainerSetHeight = () => {
        //Very dirty way to make sure we don't cut a tag chip in the midle 
        setTimeout(() => {
            if (typeof this.myRef !== 'undefined' && this.myRef.current != null) {
                var nb_lines_available_for_chips = Math.floor(this.myRef.current.offsetHeight / this.state.a_chip_height);
                nb_lines_available_for_chips = nb_lines_available_for_chips < 1 ? 1 : nb_lines_available_for_chips;
                this.setState({ tag_chips_container_height: nb_lines_available_for_chips * this.state.a_chip_height })
            }
        }, 400);
    }

    render() {
        const { classes, game_data, item_width } = this.props;
        return (
            <Fragment>
                <div className={"container item_iso "+" "+this.get_game_filter_tags()+" "} style={{ width: item_width }}>
                    <LazyLoad>
                        <img className="cover" src={game_data.getImageUrl()} alt={Utils.get_game_localized_property(game_data,"title")} onLoad={this.props.imgLoadedCounter} onError={this.props.imgLoadedCounter}/>
                    </LazyLoad>
                    <div className="overlay" />
                    <div className="info" onClick={this.show_game_details}>

                        <div style={{ height: "100%" }}>
                            <Grid container className={classes.root}>
                                <Grid container
                                    justify="center">
                                    <Grid item>
                                        {Utils.get_game_localized_property(game_data,"title")}
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid
                                        container
                                        className={classes.demo}
                                        direction="column"
                                        justify="space-evenly"
                                        alignItems="flex-start"
                                    >
                                        <Grid item className={classes.alignTextItem}>
                                            <img width="25" height="25" src="/images/icons/nbPlayer.svg" alt="Kiwi standing on oval"></img>
                                           {/*TODO nb players to play need to be a range*/}
                                           {game_data.nb_player_min} - {game_data.nb_player_max}
                                </Grid>
                                        <Grid item className={classes.alignTextItem}>
                                            <img width="25" height="25" src="/images/icons/age.svg" alt="Kiwi standing on oval"></img>
                                            {game_data.age_recommended}
                                </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid
                                        container
                                        className={classes.demo}
                                        direction="column"
                                        justify="space-evenly"
                                        alignItems="flex-end"
                                    >
                                        <Grid item className={classes.alignTextItem}>
                                            {game_data.complexity}
                                    <img width="25" height="25" src="/images/icons/complexity.svg" alt="Kiwi standing on oval"></img>
                                        </Grid>
                                        <Grid item className={classes.alignTextItem}>
                                            {/*TODO time to play need to be a range*/} 
                                            {game_data.time_to_play_min} - {game_data.time_to_play_max}
                                    <img width="25" height="25" src="/images/icons/time.svg" alt="Kiwi standing on oval"></img>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container wrap="nowrap" spacing={0} style={{ maxHeight: "30%"}}>
                                    <Grid item xs={2} className={classes.alignTextItem}>
                                        <img width="25" height="25" src="/images/icons/categories.svg" alt="Kiwi standing on oval"></img>
                                    </Grid>
                                    <Grid ref={this.myRef} className={"TagsChips"} item xs={10} style={{ overflow: "hidden", height : this.state.tag_chips_container_height}}>
                                        {this.renderTagsChips()}
                                    </Grid>
                                </Grid>
                            </Grid>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    componentDidMount = () => {
        this.tagsChipContainerSetHeight()
    }


}

GameCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    i18n: state.i18n,
    game_tags : state.tags
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            update_active_game_popup
        },
        dispatch
    );


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GameCard));