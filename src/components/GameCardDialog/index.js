import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Utils from "../../utils";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

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
      active_game: null
    };

  }

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(props) {
    this.setState({
      open: props.open,
      active_game: props.active_game
    })
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
                  <img style={cover} src={Utils.get_game_localized_property(active_game, "imageUrl")} alt="Img not found"></img>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container justify="center">
                        <Grid item xs={6} style={alignTextItem}>
                       
                          <img width="25" height="25" src="/images/icons/nbPlayer.svg" alt="Kiwi standing on oval"></img>
                          <div style={marginTextItem}>2 - 4</div>
                        </Grid>
                        <Grid item xs={6} style={alignTextItem}>
                          <img width="25" height="25" src="/images/icons/age.svg" alt="Kiwi standing on oval"></img>
                          <div style={marginTextItem}>12+</div>
                        </Grid>
                        <Grid item xs={6} style={alignTextItem}>
                          <img width="25" height="25" src="/images/icons/complexity.svg" alt="Kiwi standing on oval"></img>
                          <div style={marginTextItem}>3.5</div>
                        </Grid>
                        <Grid item xs={6} style={alignTextItem}>
                          <img width="25" height="25" src="/images/icons/time.svg" alt="Kiwi standing on oval"></img>
                          <div style={marginTextItem}>40-80</div>
                        </Grid>
                        <Grid item md={12}>
                          <Grid container>
                            <Grid item xs={2} style={alignTextItem}>
                                <img width="25" height="25" src="/images/icons/categories.svg" alt="Kiwi standing on oval"></img>
                            </Grid>
                            <Grid item xs={10}   style={{overflow : "hidden",textOverflow: "ellipsis"}}>
                                 qzd - zqd qzd - qzd -dfdvdrvdrv - srfdazdq - qzd qzddrgdr - sfrhsiuhf - qiedjiosejfio - uqhdqdz - iquzdhiozq - qkzdjizqjd - qzjdizqjd  - qjkzdhqzh - jqzdihqzd - oiqjzdizqd
                                
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
      return (<div>No Game Info</div>)
    }
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(withStyles(styles)(ResponsiveDialog));