import React from 'react';
import GodDamnMap from '../Map';
import GameLibrary from '../GameLibrary';

import { withStyles } from '@material-ui/core/styles';
import flags_img from "../../assets/landing/flags.png";
import together_img from "../../assets/landing/together.png";

const styles = theme => ({
    landingRoot:{
    	maxWidth : "100rem",
    	margin :"auto"
    },
    landingTitle:{
    	textAlign :"center",
    	marginBottom :"10rem",
    },
    presentationBlock:{
    	display: "flex",
    	marginBottom :"7rem",
    	"& h2":{
    		textAlign : "center"
    	},
    	"& > div":{
    		flexGrow :"1",
    		padding : "1rem"
    	}
    },
    godDamnMapBlock:{
    	paddingRight : "10px;",
    	paddingLeft : "10px",
    	paddingBottom :"10px",
    	flexBasis: "50%",
    	flexShrink: "0"
    },
    gameLibraryBlock :{
    	maxHeight : "30rem",
		flexBasis: "65%",
    	flexShrink: "0",
    	minHeight : "5rem",
    	overflow : "scroll",
    	scrollbarWidth: "none",
    	'&::-webkit-scrollbar': {
		    width: '0.4em'
		},
		'&::-webkit-scrollbar-track': {
		  boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
		  webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'&::-webkit-scrollbar-thumb': {
		  backgroundColor: 'rgba(0,0,0,.1)',
		  outline: '1px solid slategrey'
		}
    },
    languagesBlock: {
    	'&::-webkit-mask-image':'-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))',
    	maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))'
    },
    playTogetherBlock:{
    	backgroundImage: `url(${together_img})`,
    	backgroundRepeat: "no-repeat",
    	backgroundSize: "cover",
    	"& > div":{
    		maxWidth : "40%"
    	}
    }
});

class LandingPage extends React.Component {
    render() {
    	const {classes} = this.props;
    	return(
	        <div className={classes.landingRoot}>
			    <h1 className={classes.landingTitle}>Landing</h1>
			    <div className={classes.presentationBlock}>
			    	<div>
				    	<h2>Lorem ipsum dolor sit</h2>
				    	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a vulputate tellus, ac ullamcorper ante. Mauris eget condimentum purus. Ut vitae iaculis mauris. Aenean dictum dignissim odio, et ornare sapien vehicula vulputate. Aenean vitae lacus nunc. Nunc pellentesque, lorem sed tempor hendrerit, enim mi cursus sapien, non vulputate magna quam ac lorem. Nam eget eros vel nibh sollicitudin tempus eget vel mi. Etiam convallis sodales elit, ut faucibus velit iaculis ac. Suspendisse sit amet risus quis mi suscipit viverra eget quis massa. In nec tristique felis. Cras viverra elit in enim mattis vestibulum.</p>
				    	<p>Maecenas ac mi ipsum. Donec eget justo ultrices, scelerisque orci dapibus, volutpat felis. Vivamus tempor ipsum a massa blandit varius. Sed nisl ante, facilisis vel velit sed, venenatis malesuada sapien. Ut ut consectetur neque. Nam iaculis libero a lectus ullamcorper volutpat non a lacus. Morbi malesuada, neque in malesuada placerat, nisi turpis lobortis nulla, ullamcorper pharetra enim nisl vel ante. Donec est tortor, efficitur a quam nec, gravida ultricies nulla.</p>
			    	</div>
			    	<div className={classes.godDamnMapBlock}>
			    		<GodDamnMap/>
			    	</div>
			    </div>

			    <div className={classes.presentationBlock}>
			    	<div className={classes.gameLibraryBlock}>
			    		<GameLibrary/>
			    	</div>
			    	<div>
				    	<h2>Lorem ipsum dolor sit</h2>
				    	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a vulputate tellus, ac ullamcorper ante. Mauris eget condimentum purus. Ut vitae iaculis mauris. Aenean dictum dignissim odio, et ornare sapien vehicula vulputate. Aenean vitae lacus nunc. Nunc pellentesque, lorem sed tempor hendrerit, enim mi cursus sapien, non vulputate magna quam ac lorem. Nam eget eros vel nibh sollicitudin tempus eget vel mi. Etiam convallis sodales elit, ut faucibus velit iaculis ac. Suspendisse sit amet risus quis mi suscipit viverra eget quis massa. In nec tristique felis. Cras viverra elit in enim mattis vestibulum.</p>
				    	<p>Maecenas ac mi ipsum. Donec eget justo ultrices, scelerisque orci dapibus, volutpat felis. Vivamus tempor ipsum a massa blandit varius. Sed nisl ante, facilisis vel velit sed, venenatis malesuada sapien. Ut ut consectetur neque. Nam iaculis libero a lectus ullamcorper volutpat non a lacus. Morbi malesuada, neque in malesuada placerat, nisi turpis lobortis nulla, ullamcorper pharetra enim nisl vel ante. Donec est tortor, efficitur a quam nec, gravida ultricies nulla.</p>
			    	</div>
			    </div>

			    <div className={classes.presentationBlock}>
			    	<div className={classes.languagesBlock}>
			    		<img  src={flags_img} alt="Footer"/>
			    	</div>
			    	<div>
				    	<h2>Lorem ipsum dolor sit</h2>
				    	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a vulputate tellus, ac ullamcorper ante. Mauris eget condimentum purus. Ut vitae iaculis mauris. Aenean dictum dignissim odio, et ornare sapien vehicula vulputate. Aenean vitae lacus nunc. Nunc pellentesque, lorem sed tempor hendrerit, enim mi cursus sapien, non vulputate magna quam ac lorem. Nam eget eros vel nibh sollicitudin tempus eget vel mi. Etiam convallis sodales elit, ut faucibus velit iaculis ac. Suspendisse sit amet risus quis mi suscipit viverra eget quis massa. In nec tristique felis. Cras viverra elit in enim mattis vestibulum.</p>
				    	<p>Maecenas ac mi ipsum. Donec eget justo ultrices, scelerisque orci dapibus, volutpat felis. Vivamus tempor ipsum a massa blandit varius. Sed nisl ante, facilisis vel velit sed, venenatis malesuada sapien. Ut ut consectetur neque. Nam iaculis libero a lectus ullamcorper volutpat non a lacus. Morbi malesuada, neque in malesuada placerat, nisi turpis lobortis nulla, ullamcorper pharetra enim nisl vel ante. Donec est tortor, efficitur a quam nec, gravida ultricies nulla.</p>
				    	<p>Maecenas ac mi ipsum. Donec eget justo ultrices, scelerisque orci dapibus, volutpat felis. Vivamus tempor ipsum a massa blandit varius. Sed nisl ante, facilisis vel velit sed, venenatis malesuada sapien. Ut ut consectetur neque. Nam iaculis libero a lectus ullamcorper volutpat non a lacus. Morbi malesuada, neque in malesuada placerat, nisi turpis lobortis nulla, ullamcorper pharetra enim nisl vel ante. Donec est tortor, efficitur a quam nec, gravida ultricies nulla.</p>
				    	<p>Maecenas ac mi ipsum. Donec eget justo ultrices, scelerisque orci dapibus, volutpat felis. Vivamus tempor ipsum a massa blandit varius. Sed nisl ante, facilisis vel velit sed, venenatis malesuada sapien. Ut ut consectetur neque. Nam iaculis libero a lectus ullamcorper volutpat non a lacus. Morbi malesuada, neque in malesuada placerat, nisi turpis lobortis nulla, ullamcorper pharetra enim nisl vel ante. Donec est tortor, efficitur a quam nec, gravida ultricies nulla.</p>
			    	</div>
			    </div>

			    <div className={classes.presentationBlock, classes.playTogetherBlock}>
			    	<div>
				    	<h2>Lorem ipsum dolor sit</h2>
				    	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a vulputate tellus, ac ullamcorper ante. Mauris eget condimentum purus. Ut vitae iaculis mauris. Aenean dictum dignissim odio, et ornare sapien vehicula vulputate. Aenean vitae lacus nunc. Nunc pellentesque, lorem sed tempor hendrerit, enim mi cursus sapien, non vulputate magna quam ac lorem. Nam eget eros vel nibh sollicitudin tempus eget vel mi. Etiam convallis sodales elit, ut faucibus velit iaculis ac. Suspendisse sit amet risus quis mi suscipit viverra eget quis massa. In nec tristique felis. Cras viverra elit in enim mattis vestibulum.</p>
				    	<p>Maecenas ac mi ipsum. Donec eget justo ultrices, scelerisque orci dapibus, volutpat felis. Vivamus tempor ipsum a massa blandit varius. Sed nisl ante, facilisis vel velit sed, venenatis malesuada sapien. Ut ut consectetur neque. Nam iaculis libero a lectus ullamcorper volutpat non a lacus. Morbi malesuada, neque in malesuada placerat, nisi turpis lobortis nulla, ullamcorper pharetra enim nisl vel ante. Donec est tortor, efficitur a quam nec, gravida ultricies nulla.</p>
				    	<p>Maecenas ac mi ipsum. Donec eget justo ultrices, scelerisque orci dapibus, volutpat felis. Vivamus tempor ipsum a massa blandit varius. Sed nisl ante, facilisis vel velit sed, venenatis malesuada sapien. Ut ut consectetur neque. Nam iaculis libero a lectus ullamcorper volutpat non a lacus. Morbi malesuada, neque in malesuada placerat, nisi turpis lobortis nulla, ullamcorper pharetra enim nisl vel ante. Donec est tortor, efficitur a quam nec, gravida ultricies nulla.</p>
			    	</div>
			    	
			    </div>
			    
		  	</div>
	  );
    }
}
export default withStyles(styles)(LandingPage);