import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import footer_img from "../../assets/footer/footer.png";


const styles = theme => ({
    footerContainer: {
    	position: "absolute",
		bottom: 0,
		width: "100%",
		height: "10rem",
		display: "flex",
    	flexDirection: "column"
    },
    footerImg:{
    	maxWidth : "100%",
    	maxHeight: "100%",
    	width: "100%"
    },
    footerItemsContainer:{
    	display: "flex",
    	justifyContent: "space-evenly",
    	backgroundColor: theme.palette.primary.main ,
    	flex: "1 1 auto",
    	color : theme.palette.secondary.main,
    	"& ul":{
    		listStyleType: "none"
    	}
    }

});

class Footer extends React.Component {
  render() {
    const {classes} = this.props;
	 return (
	   	<div className={classes.footerContainer}>
	      <img className={classes.footerImg} src={footer_img} alt="Footer"/>
	      <div className={classes.footerItemsContainer}>
	      	<ul>
	      	<li>Lorem ipsum dolor</li>
	      	<li>Aenean non elit</li>
	      	<li>Quisque vulputate</li>
	      	<li>Ut vulputate</li>
	      	<li>Duis vel</li>
	      	</ul>
	      	<ul>
	      	<li>Vivamus vel</li>
	      	<li>Nunc vel</li>
	      	<li>Sed sed</li>
	      	<li>Duis metus</li>
	      	<li>Nam erat</li>
	      	</ul>
	      	<ul>
	      	<li>Praesent mollis</li>
	      	<li>Sed eros</li>
	      	<li>Ut varius</li>
	      	<li>Morbi euismod</li>
	      	<li>In quam</li>
	      	</ul>
	      </div>
	    </div>
	);

  }
}

export default withStyles(styles)(Footer)