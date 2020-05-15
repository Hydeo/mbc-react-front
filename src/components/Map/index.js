import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Map,
    Marker,
    Popup,
    TileLayer,
    Circle,
    FeatureGroup,
    LayerGroup,
    LayersControl,
    Rectangle
} from "react-leaflet";

const { BaseLayer, Overlay } = LayersControl;

const styles = theme => ({
    mapContainer:{
    	height :"100%",
    	width :"100%",
    	margin : "auto"
    },
    godDamnMap:{
    	height :"100%",
    	width :"100%"
    }
});

class GodDamnMap extends React.Component {

    render() {
    	const {classes} = this.props;
    	return(
    		<div className={classes.mapContainer}>
			    <Map className={classes.godDamnMap} center={[51.505,-0.09]} zoom={13}>
			            <TileLayer
			              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
			              url="http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
			            />
			            <TileLayer
			              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
			              url="http://tile.stamen.com/toner-labels/{z}/{x}/{y}.png"
			            />
			  	</Map>
		  	</div>	
	  );
    }
}
export default withStyles(styles)(GodDamnMap);