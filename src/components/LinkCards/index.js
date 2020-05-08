import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { update_isotope, delete_link } from "../../actions/basic_actions";
import {
  add_game_to_collection,
  remove_game_from_collection
} from "../../actions/game_collection_actions";

//import classnames from "classnames";
import LazyLoad from "react-lazyload";


import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Delete from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { apply_game_mask } from "./GameCardUtils";
import Utils from "../../utils";

const styles = theme => ({
  card: {
    marginBottom: "15px"
  },
  media: {
    height: 0,
    //paddingTop: '46.25%', // 16:9
    paddingTop: "100%", // 16:9
    backgroundSize: "contain"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  marginAuto: {
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  loadingBackgound: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: "url(" + "./images/spinner_dice.gif" + ")"
  }
});

class LinkCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  update_isotope_layout = () => {
    this.props.isotope_instance.layout();
  };

  add_game_to_user_collection = () => {
    this.props.add_game_to_collection(this.props.link_data._id);
  };
  remove_game_from_user_collection = () => {
    this.props.remove_game_from_collection(this.props.link_data._id);
  };

  render() {
  
    const { classes, link_data, game_mask } = this.props;
  
    if (
      link_data.image == null ||
      link_data.image == undefined ||
      !link_data.image.includes("http")
    )
      link_data.image = "/images/404jpg";

    if (game_mask != null) {
      apply_game_mask(link_data, game_mask);
    }

    return (
      /*<div className={" link_item "} style={this.props.cardSize}>
        <Card className={classes.card}>
          <LazyLoad className="qzd" offset={0}>
            <div>
              <a
                target="_blank"
                href={Utils.get_game_localized_property(link_data, "imageUrl")}
              >
                <CardMedia
                  className={classes.media + " " + classes.loadingBackgound}
                  image={Utils.get_game_localized_property(link_data, "imageUrl")}
                  title={Utils.get_game_localized_property(link_data, "imageUrl")}
                />
              </a>
            </div>
          </LazyLoad>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {Utils.get_game_localized_property(link_data, "title")}
            </Typography>
          </CardContent>
          <Collapse
            in={this.state.expanded}
            onExited={() => {
              this.update_isotope_layout();
            }}
            onEntered={() => {
              this.update_isotope_layout();
            }}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              <Typography component="p">
                {Utils.get_game_localized_property(link_data, "description")}
              </Typography>
            </CardContent>
          </Collapse>
          <CardActions>
            <IconButton
              onClick={() => {
                this.props.update({
                  title: "Delete '" + link_data.title + "' ?",
                  description: "Url : " + link_data.url,
                  open: true,
                  agree_callback: () => {
                    this.remove_game_from_user_collection();
                  }
                });
              }}
            >
              <Delete color="error" />
            </IconButton>

            <IconButton
              onClick={this.add_game_to_user_collection}
              color="primary"
            >
              <LinkIcon />
            </IconButton>
            <IconButton>
              <Link to={{ pathname: routes.CREATE_MASK, state: { game_data: link_data, game_mask : game_mask } }}>
                <EditIcon />
              </Link>
            </IconButton>
            <IconButton
              className={classnames(classes.expand, classes.marginAuto, {
                [classes.expandOpen]: this.state.expanded
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
    */"");
  }

  componentDidUpdate = () => { };
}

//On recupere la tate dans les props
const mapStateToProps = state => ({
  isotope_instance: state.isotope.isotope_instance,
  i18n: state.i18n
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update_isotope,
      delete_link,
      add_game_to_collection,
      remove_game_from_collection
    },
    dispatch
  );

const compoStyled = withStyles(styles)(LinkCard);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(compoStyled);
