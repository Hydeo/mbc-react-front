import React, { Fragment } from 'react';
import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {
    update_active_game_popup
  } from "../../actions/game_cards_actions";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GameCardDialog from "../GameCardDialog";
import LazyLoad from "react-lazyload";
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
            open: false
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    show_game_details = () => {
        this.props.update_active_game_popup(this.props.game_data);
    }

    get_game_tags = () =>{
        var tagString = "";
        this.props.game_data.tags.forEach(element => {
           // tagString += " "+element+" ";
           tagString +=" "+element["listLocName"][this.props.lang]["locName"];
        });
        /*this.props.game_data.mechanism.forEach(element => {
            tagString += " "+element+" ";
        });*/
        console.log(tagString);
        return tagString;
    }

    render() {
        const { classes, game_data, item_width } = this.props;

        return (
            <Fragment>
                <div className={"container item_iso "+" "+this.get_game_tags()+" "} style={{ width: item_width }}>
                    <LazyLoad>
                        <img className="cover" src={game_data.localization.eng.imageUrl} alt="qzd" onLoad={this.props.imgLoadedCounter} onError={this.props.imgLoadedCounter}/>
                    </LazyLoad>
                    <div className="overlay" />
                    <div className="info" onClick={this.show_game_details}>

                        <div style={{ height: "100%" }}>
                            <Grid container className={classes.root}>
                                <Grid container
                                    justify="center">
                                    <Grid item>
                                        {game_data.localization.eng.title}
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
                                            2 - 4
                                </Grid>
                                        <Grid item className={classes.alignTextItem}>
                                            <img width="25" height="25" src="/images/icons/age.svg" alt="Kiwi standing on oval"></img>
                                            12+
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
                                            3.5
                                    <img width="25" height="25" src="/images/icons/complexity.svg" alt="Kiwi standing on oval"></img>
                                        </Grid>
                                        <Grid item className={classes.alignTextItem}>
                                            40-80
                                    <img width="25" height="25" src="/images/icons/time.svg" alt="Kiwi standing on oval"></img>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container wrap="nowrap" spacing={0} style={{ maxHeight: "30%" }}>
                                    <Grid item xs={2} className={classes.alignTextItem}>
                                        <img width="25" height="25" src="/images/icons/categories.svg" alt="Kiwi standing on oval"></img>
                                    </Grid>
                                    <Grid item xs={10} style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                        qzd - zqd qzd - qzd -dfdvdrvdrv - srfdazdq - qzd qzddrgdr - sfrhsiuhf - qiedjiosejfio - uqhdqdz - iquzdhiozq - qkzdjizqjd - qzjdizqjd  - qjkzdhqzh - jqzdihqzd - oiqjzdizqd
                            </Grid>
                                </Grid>
                            </Grid>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    componentDidMount = () =>{
            //console.log('Did mount');
            
    }
}

GameCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        update_active_game_popup
    },
    dispatch
  );


export default withStyles(styles)(connect(null,mapDispatchToProps)(GameCard));