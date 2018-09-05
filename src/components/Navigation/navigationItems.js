import React, { Fragment } from "react";

import * as routes from "../../constants/routes";
import { Link } from "react-router-dom";

import LangSwitcher from './langSwitcher';

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputIcon from "@material-ui/icons/Input";
import AppsIcon from "@material-ui/icons/Apps";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import SignOutButton from "../SignOut";
import Hidden from "@material-ui/core/Hidden";
import white from "@material-ui/core/colors/blue";

const styleLink = {
  flexGrow: 1
};

const styleListItem = {
  width: "unset"
};

const styleLogoNavBar = {
  container: {
    position: "relative",
    flexGrow: 1
  },
  widthCalibration: {
    overflow: "hidden",
    maxHeight: "15px"
  },
  logo: {
    zIndex: 2,
    position: "absolute",
    overflow: "visible",
    top: "-25px"
  }
};

export const authNavbarListItems = (
  <Fragment>
    <Link style={styleLink} to={routes.LANDING}>
      <ListItem style={styleListItem} button>
        <ListItemIcon>
          <HomeIcon style={{ color: "white" }} color={"inherit"} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subheading" style={{ color: "#FFFFFF" }}>
              Landing
            </Typography>
          }
        />
      </ListItem>
    </Link>

    <Link style={styleLink} to={routes.HOME}>
      <ListItem style={styleListItem} button>
        <ListItemIcon>
          <AppsIcon style={{ color: "white" }} color={"inherit"} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subheading" style={{ color: "#FFFFFF" }}>
              My Games
            </Typography>
          }
        />
      </ListItem>
    </Link>
    <div style={styleLogoNavBar.container}>
      <div style={styleLogoNavBar.widthCalibration}>
        <img src="/images/logo-ss.png" alt="qzd" />
      </div>
      <img style={styleLogoNavBar.logo} src="/images/logo-ss.png" alt="qzd" />
    </div>
    <Link style={styleLink} to={routes.ACCOUNT}>
      <ListItem style={styleListItem} button>
        <ListItemIcon>
          <AccountCircleIcon style={{ color: "white" }} color={"inherit"} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subheading" style={{ color: "#FFFFFF" }}>
              My Account
            </Typography>
          }
        />
      </ListItem>
    </Link>
    <div style={styleLink}>
      <ListItem style={styleListItem} button>
        <SignOutButton />
      </ListItem>
    </div>
    <LangSwitcher/>
  </Fragment>
);

export const authDrawerListItems = (
  <Fragment>
    <Link to={routes.LANDING}>
      <ListItem style={styleListItem} button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Landing" />
      </ListItem>
    </Link>

    <Link to={routes.HOME}>
      <ListItem style={styleListItem} button>
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="My Games" />
      </ListItem>
    </Link>

    <Link to={routes.ACCOUNT}>
      <ListItem style={styleListItem} button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Account" />
      </ListItem>
    </Link>

    <ListItem style={styleListItem} button>
      <SignOutButton />
    </ListItem>
  </Fragment>
);


/*This one is used for wide & mobile thanks to the Hidden*/ 
export const nonAuthDrawerListItems = (
  <Fragment>
    <Link to={routes.LANDING}>
      <ListItem style={styleListItem} button>
        <Hidden smUp>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Landing" />
        </Hidden>
        <Hidden xsDown>
          <ListItemIcon>
            <HomeIcon style={{ color: "white" }} color={"inherit"} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="subheading" style={{ color: "#FFFFFF" }}>
                Landing
              </Typography>
            }
          />
        </Hidden>
      </ListItem>
    </Link>

    <Link to={routes.SIGN_IN}>
      <ListItem style={styleListItem} button>
        <Hidden smUp>
          <ListItemIcon>
            <InputIcon />
          </ListItemIcon>
          <ListItemText primary="Sign In" />
        </Hidden>
        <Hidden xsDown>
          <ListItemIcon>
            <InputIcon style={{ color: "white" }} color={"inherit"} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="subheading" style={{ color: "#FFFFFF" }}>
                Sign In
              </Typography>
            }
          />
        </Hidden>
      </ListItem>
    </Link>
  </Fragment>
);
