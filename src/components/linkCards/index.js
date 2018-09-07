import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'
import {
	update_isotope,
	delete_link
} from '../../actions/basic_actions'

import classnames from 'classnames';
import LazyLoad from 'react-lazyload';



import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ( {
  card: {
    marginBottom: "15px"
  },
  media: {
    height: 0,
    //paddingTop: '46.25%', // 16:9
    paddingTop: '100%', // 16:9
    backgroundSize: "contain",
  },
   expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  },
  marginAuto : {
  	marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  loadingBackgound: {
  	backgroundSize : "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: "url("+"./images/spinner_dice.gif"+")",
  },
});


class LinkCard extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			expanded: false,
		}
	}

	handleExpandClick = () => {
	    this.setState({ 
	    	expanded: !this.state.expanded 
	    });
	};

	update_isotope_layout = ()=>{
		this.props.isotope_instance.layout();
	}


	render(){
		
		const {classes, link_data, game_mask} = this.props;
		if(link_data.image == null || link_data.image == undefined || !link_data.image.includes("http"))
			link_data.image="/images/404jpg";


		//Pourquoi le mask ne s'applique pas ?
		
			var has_mask  = game_mask.hasOwnProperty(link_data._id); //this == gameMask object passend as this in map function
      var title = link_data.localization.eng.title;
      var description = (has_mask && game_mask[link_data._id].comment != null) ? game_mask[link_data._id].comment : link_data.localization.eng.description;

		return (
		<div className={" link_item "} style={this.props.cardSize}>
	      <Card className={classes.card}>
	      	<LazyLoad  className="qzd" offset={0}>
	      		<div>
		      		<a target="_blank" href={link_data.localization.eng.imageUrl}>
				        <CardMedia
				          className={classes.media +' '+classes.loadingBackgound}
				          image={link_data.localization.eng.imageUrl}
				          title={link_data.title}
				        />
				    </a>
		        </div>		
	        </LazyLoad>
	        <CardContent>
	          <Typography gutterBottom variant="headline" component="h2">
	            {link_data.localization.eng.title}
	          </Typography>
	        </CardContent>
	        <Collapse in={this.state.expanded} onExited={()=>{this.update_isotope_layout()}} onEntered={()=>{this.update_isotope_layout()}} timeout="auto" unmountOnExit>
		        <CardContent>
		          <Typography component="p">
		            {description}
		          </Typography>
		        </CardContent>
		    </Collapse>
	        <CardActions>
	        	<IconButton onClick={()=>{this.props.update({title:"Delete '"+link_data.title+"' ?",description:"Url : "+link_data.url, open:true, agree_callback : ()=>{this.props.delete_link(link_data.id)}});}}>
              		<Delete color="error"/>
            	</IconButton>


	            <a target="_blank" href={link_data.url} className={classes.marginAuto}>
	            	<IconButton  color="primary">
			        	<LinkIcon/>
			        </IconButton>
		        </a>
            	<IconButton
	              className={classnames(classes.expand,classes.marginAuto, {
	                [classes.expandOpen]: this.state.expanded,
	              })}
	              onClick={this.handleExpandClick}
	              aria-expanded={this.state.expanded}
	              aria-label="Show more"
	            >
              		<ExpandMoreIcon />
            	</IconButton>

	        </CardActions>
	      </Card>
	    </div>
		)
	}

	componentDidUpdate = ()=>{
	}

}


//On recupere la tate dans les props
const mapStateToProps = state =>({
	isotope_instance : state.collection_isotope.isotope_instance
})


const mapDispatchToProps = dispatch => bindActionCreators({
  update_isotope,
  delete_link
}, dispatch)

const compoStyled = withStyles(styles)(LinkCard);
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(compoStyled)
