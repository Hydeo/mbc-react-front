import React from 'react';
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

const cover = {
  width: "100%"
}

const container ={
  backgroundColor : "#E0E0E0"
}
class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      active_game: null
    };

  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      open: props.open,
      active_game: props.active_game
    })


  }

  render() {
    const { fullScreen } = this.props;
    const { active_game } = this.state;
    console.log(this.state);
    if (active_game != null) {
      return (
        <div>
          <Button onClick={this.handleClickOpen}>Open responsive dialog</Button>
          <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{Utils.get_game_localized_property(active_game, "title")}</DialogTitle>
            <DialogContent style={container}>

              <Grid container alignItems="center" spacing={16}>
                <Grid item md={4}>
                  <img style={cover} src={Utils.get_game_localized_property(active_game, "imageUrl")} alt="Img not found"></img>
                </Grid>
                <Grid item md={8}>
                  <Grid container>
                    <Grid item md={12}>
                      <Grid container>
                        <Grid item md={6}>
                          <img width="25" height="25" src="/images/icons/nbPlayer.svg" alt="Kiwi standing on oval"></img>
                          2 - 4
                        </Grid>
                        <Grid item md={6}>
                          <img width="25" height="25" src="/images/icons/age.svg" alt="Kiwi standing on oval"></img>
                          12+
                        </Grid>
                        <Grid item md={6}>
                          <img width="25" height="25" src="/images/icons/complexity.svg" alt="Kiwi standing on oval"></img>
                          3.5
                        </Grid>
                        <Grid item md={6}>
                          <img width="25" height="25" src="/images/icons/time.svg" alt="Kiwi standing on oval"></img>
                          40-80
                        </Grid>
                        <Grid item md={12}>
                            <Grid item xs={2}>
                                <img width="25" height="25" src="/images/icons/categories.svg" alt="Kiwi standing on oval"></img>
                            </Grid>
                            <Grid item xs={10}   style={{overflow : "hidden",textOverflow: "ellipsis"}}>
                                 qzd - zqd qzd - qzd -dfdvdrvdrv - srfdazdq - qzd qzddrgdr - sfrhsiuhf - qiedjiosejfio - uqhdqdz - iquzdhiozq - qkzdjizqjd - qzjdizqjd  - qjkzdhqzh - jqzdihqzd - oiqjzdizqd
                                
                            </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={12}>
                      description
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <DialogContentText>
                {Utils.get_game_localized_property(active_game, "description")}
              </DialogContentText>



            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Disagree
            </Button>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Agree
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

export default withMobileDialog()(ResponsiveDialog);