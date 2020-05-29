import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddGameToFavorite from '../AddGameToFavorite/index.js';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CreateGame from '../CreateGame/'
import {MODES_CRUD_GAME_VIEW} from '../CreateGame/'

import Utils from "../../utils";
import {
    update_active_game_popup
} from "../../actions/game_cards_actions";


const styles = theme => ({
    titleColor: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        fontSize: "1.5em"
    },
    verticalCenter: {
        display: "flex",
        alignItems: "center"
    },
    flexPushRight: {
        marginLeft: "auto"
    },
    marginTextItem: {
        marginLeft: "10px"
    },
    alignTextItem: {
        display: "flex",
        alignItems: "center",
        marginBottom: "10px"
    },
    container: {
        backgroundColor: "#E0E0E0",
        paddingTop: "24px"
    },
    cover: {
        width: "100%"
    }

});

const states_modes = {
    "READ": "EDIT",
    "EDIT": "READ"
}

class ResponsiveDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            cur_lang: "eng",
            active_game: null,
            editable: props.editable ? true : false,
            mode: states_modes.hasOwnProperty(props.mode) ? props.mode : "READ"
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            open: props.game_cards.open,
            cur_lang: props.game_cards.cur_lang,
            active_game: props.game_cards.active_game
        })
    }

    render() {
        const { fullScreen, classes } = this.props;
        const { active_game } = this.state;
        var view = null;

        if (active_game != null) {

            switch (this.state.mode) {
                case "READ":
                    view = this.readGame();
                    break;
                case "EDIT":
                    view = this.editGame();
                    break;
                default:
                    view = this.readGame();
            }

            return (
                <div>
                  <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="md"
                  >
                    <DialogTitle id="responsive-dialog-title" disableTypography={true} className={classes.titleColor}>
                      <div className={classes.verticalCenter}>
                        {Utils.get_game_localized_property(active_game, "title")}
                        {this.state.editable && 
                            <IconButton  className={classes.flexPushRight} onClick={this.handleToggleViewMode} color="secondary" aria-label="upload picture" component="span">
                              <EditIcon />
                            </IconButton>
                        }
                      </div>
                    </DialogTitle>
                    <DialogContent className={classes.container}>
                        <Grid container>
                            {view}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                  </Dialog>
                </div>
            );
        } else {
            return (<div></div>)
        }
    }


    editGame = () => {
        const { fullScreen, classes } = this.props;
        const { active_game } = this.state;
        return (
            <CreateGame mode={"CUSTOMISE"} propGame = {active_game}/>
        );
    }

    readGame = () => {
        const { fullScreen, classes } = this.props;
        const { active_game } = this.state;
        return (
            <Fragment>
                <Grid container alignItems="center" spacing={16}>
                    <Grid item  xs={12} md={5}>
                    <AddGameToFavorite active_game = {this.state.active_game}/>
                        <img className={classes.cover} src={Utils.get_game_localized_property(active_game, "imageUrl")} alt="Img not found"></img>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Grid container justify="center">
                            <Grid item xs={6} className={classes.alignTextItem}>
                              <img width="25" height="25" src="/images/icons/nbPlayer.svg" alt="Kiwi standing on oval"></img>
                              <div className={classes.marginTextItem}>{active_game.nb_player_min} - {active_game.nb_player_max}</div>
                            </Grid>
                            <Grid item xs={6}className={classes.alignTextItem}>
                              <img width="25" height="25" src="/images/icons/age.svg" alt="Kiwi standing on oval"></img>
                              <div className={classes.marginTextItem}>{active_game.age_recommended}+</div>
                            </Grid>
                            <Grid item xs={6} className={classes.alignTextItem}>
                              <img width="25" height="25" src="/images/icons/complexity.svg" alt="Kiwi standing on oval"></img>
                              <div className={classes.marginTextItem}>{active_game.complexity}</div>
                            </Grid>
                            <Grid item xs={6} className={classes.alignTextItem}>
                              <img width="25" height="25" src="/images/icons/time.svg" alt="Kiwi standing on oval"></img>
                              <div className={classes.marginTextItem}>{active_game.time_to_play_min} - {active_game.time_to_play_max}</div>
                            </Grid>
                            <Grid item md={12}>
                              <Grid container>
                                <Grid item xs={2} className={classes.alignTextItem}>
                                    <img width="25" height="25" src="/images/icons/categories.svg" alt="Kiwi standing on oval"></img>
                                </Grid>
                                <Grid item xs={10}   style={{overflow : "hidden",textOverflow: "ellipsis"}}>
                                  {this.renderTagsChips()}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <DialogContentText>
                Description:
                </DialogContentText>
                <DialogContentText >
                        { Utils.get_game_localized_property(active_game, "description") } 
                </DialogContentText>
            </Fragment>
        )
    }

    handleToggleViewMode = ()=>{
        //A bit like state machine, current mode = key and value is the valid mode to transition to
        this.setState({
            mode : states_modes[this.state.mode]
        })
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.update_active_game_popup({ "active_game": this.props.game_data, open: false });
    };

    renderTagsChips = () => {
        return this.state.active_game.tags.map(function(e, index) {
            return (
                <Chip
                    key={index}
                    label={this.game_tags[e._id].localization[this.i18n.cur_lang].trad}
                    href="#chip"
                    clickable
                />
            )
        }, this.props)

    }

}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    game_cards: state.game_cards,
    game_tags: state.tags,
    "i18n": state.i18n
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
    bindActionCreators({
            update_active_game_popup
        },
        dispatch
    );


export default withMobileDialog()(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog)));