import React, { Fragment } from 'react';
import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddGameToFavorite from '../AddGameToFavorite/index.js';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Utils from "../../utils";
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import {
    update_active_game_popup
} from "../../actions/game_cards_actions";


const styles = theme => ({
  titleColor: {
      backgroundColor : theme.palette.primary.main,
      color : theme.palette.secondary.main,
      fontSize: "1.5em"
  }
});

const cover = {
  width: "100%"
}

const container ={
  backgroundColor : "#E0E0E0",
  paddingTop : "24px"
}

const alignTextItem = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px"
}

const marginTextItem ={
  marginLeft : "10px"
}
class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      cur_lang : "eng",
      active_game: null
    };
    
    
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.update_active_game_popup({"active_game":this.props.game_data, open:false});
  };

  componentWillReceiveProps(props) {
    this.setState({
      open: props.game_cards.open,
      cur_lang : props.game_cards.cur_lang,
      active_game: props.game_cards.active_game
    })
  }

  renderTagsChips = () => {
        return this.state.active_game.tags.map(function(e,index) {
            return (
                <Chip
                    key={index}
                    label={e.localization[this.cur_lang].trad}
                    href="#chip"
                    clickable
                />
            )
        }, this.props.i18n)

    }

  render() {
    const { fullScreen, classes } = this.props;
    const { active_game } = this.state;
    if (active_game != null) {
      return (
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title" disableTypography={true} className={classes.titleColor}>{Utils.get_game_localized_property(active_game, "title")}</DialogTitle>
            <DialogContent style={container}>

              <Grid container alignItems="center" spacing={16}>
                <Grid item  xs={12} md={5}>
                <AddGameToFavorite active_game = {this.state.active_game}/>
                  <img style={cover} src={Utils.get_game_localized_property(active_game, "imageUrl")} alt="Img not found"></img>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container justify="center">
                        <Grid item xs={6} style={alignTextItem}>
                          <img width="25" height="25" src="/images/icons/nbPlayer.svg" alt="Kiwi standing on oval"></img>
                          <div style={marginTextItem}>{active_game.nb_player_min} - {active_game.nb_player_max}</div>
                        </Grid>
                        <Grid item xs={6} style={alignTextItem}>
                          <img width="25" height="25" src="/images/icons/age.svg" alt="Kiwi standing on oval"></img>
                          <div style={marginTextItem}>{active_game.age_recommended}+</div>
                        </Grid>
                        <Grid item xs={6} style={alignTextItem}>
                          <img width="25" height="25" src="/images/icons/complexity.svg" alt="Kiwi standing on oval"></img>
                          <div style={marginTextItem}>{active_game.complexity}</div>
                        </Grid>
                        <Grid item xs={6} style={alignTextItem}>
                          <img width="25" height="25" src="/images/icons/time.svg" alt="Kiwi standing on oval"></img>
                          <div style={marginTextItem}>{active_game.time_to_play_min} - {active_game.time_to_play_max}</div>
                        </Grid>
                        <Grid item md={12}>
                          <Grid container>
                            <Grid item xs={2} style={alignTextItem}>
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
                Description : 
              </DialogContentText>
              <DialogContentText>
                {Utils.get_game_localized_property(active_game, "description")}
              </DialogContentText>



            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
                Close
            </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    else {
      return (<div></div>)
    }
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  game_cards : state.game_cards,
  "i18n" : state.i18n
});

//On injecte les actions possible au props ?
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update_active_game_popup
    },
    dispatch
  );


export default withMobileDialog()(withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(ResponsiveDialog)));