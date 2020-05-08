import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import e500 from "../../assets/errors/500.png";


const styles = theme => ({
    errorRoot: {
        textAlign : "center"
    }

});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log("======== React Error ==========");
    console.log({
      error : error,
      info : info
    })
    console.log("======== ===== ==========");
  }

  render() {
    const {classes} = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={classes.errorRoot}>
          <h1>Something went wrong.</h1>
          <img src={e500} alt="Something went wrong !"/>
        </div>
      );
    }
    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary)