import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose = () => {
    this.props.update({...this.props.parentState, open : false})
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.parentState.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.parentState.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.parentState.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{
                                  if(this.props.parentState.disagree_callback != null) 
                                    {this.props.parentState.disagree_callback()}
                                  this.handleClose()
                                  }
                            } 
            color="primary">
              Disagree
            </Button>
            <Button onClick={()=>{
                                  if(this.props.parentState.agree_callback != null) 
                                    {this.props.parentState.agree_callback()}
                                  this.handleClose()
                                  }
                            } 
                    color="primary" 
                    autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;