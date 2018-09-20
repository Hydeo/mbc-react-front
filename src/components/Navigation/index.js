import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { I18n, Trans } from "react-i18next";

import AuthUserContext from "../Session/AuthUserContext";
import SignOutButton from "../SignOut";
import * as routes from "../../constants/routes";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import GameCard from "../GameCard"
import {
  authDrawerListItems,
  nonAuthDrawerListItems,
  authNavbarListItems
} from "./navigationItems";

import Grid from '@material-ui/core/Grid';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: "black",
    padding: theme.spacing.unit * 3
  },
  text: {
    color: "green",
    background: "magenta"
  }
});

class Navigation extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, width } = this.props;
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className={classes.root}>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (
                  <NavigationAuth
                    classes={classes}
                    width={width}
                    theme={theme}
                    handleDrawerToggle={this.handleDrawerToggle}
                    mobileOpen={this.state.mobileOpen}
                  />
                ) : (
                    <NavigationNonAuth
                      classes={classes}
                      width={width}
                      theme={theme}
                      handleDrawerToggle={this.handleDrawerToggle}
                      mobileOpen={this.state.mobileOpen}
                    />
                  )
              }
            </AuthUserContext.Consumer>

            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Typography noWrap>
                <Trans i18nKey="description.part1">
                  To get started, edit <code>src/App.js</code> and save to
                  reload.
                  <br />
                </Trans>
                {"You think water moves fast? You should see ice."}
              </Typography>

              <Grid container spacing={16}>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/-nnzXSm6wDQvH5lckCzUtaaprGE=/fit-in/900x600/filters:no_upscale()/pic2437871.jpg" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/ZyuP2RO95ntqAz6pE3LGf-XA-U8=/fit-in/900x600/filters:no_upscale()/pic4313310.png" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/sgZLoyg3KKeHvyHel8tZ2TIkXRw=/fit-in/900x600/filters:no_upscale()/pic3536616.jpg" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/Q6GnWhr1y1gMJpRNRogK_QBou_k=/fit-in/900x600/filters:no_upscale()/pic3918905.png" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/sKUvzQNCqEbJ-mk84VzQX947v2M=/fit-in/900x600/filters:no_upscale()/pic3122349.jpg" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/q_b5Jw43Tnyw3hT8l2zMKmLOPvU=/fit-in/900x600/filters:no_upscale()/pic3615739.png" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/XzToY7sWGP9v-KEG84k5V5ks8L4=/fit-in/900x600/filters:no_upscale()/pic4309360.jpg" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/VrePp6I9_HXw_NtBe4NFcwF5dRQ=/fit-in/900x600/filters:no_upscale()/pic3163924.jpg" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/jlHEfBOhoTpL2DCdeNqV4F40GSQ=/fit-in/900x600/filters:no_upscale()/pic4162054.png" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/9ik7Wc_ANTeGU-V5wXytIxPZ2sE=/fit-in/900x600/filters:no_upscale()/pic3490053.jpg" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/BwJJTrofiaH0Muxuo5rv0VCmuCY=/fit-in/900x600/filters:no_upscale()/pic2582929.jpg" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/MtQYIKLpnzWm601nexPN1qx-juM=/fit-in/900x600/filters:no_upscale()/pic3862634.png" />
                </Grid>
                <Grid item>
                  <GameCard url="https://cf.geekdo-images.com/imagepage/img/JnONKNDVGf5t3_m6TrBVDdFbn3w=/fit-in/900x600/filters:no_upscale()/pic3979766.png" />
                </Grid>


              </Grid>
            </main>
          </div>
        )}
      </I18n>
    );
  }
}

const NavigationAuth = props => {
  const { classes, width, theme, handleDrawerToggle, mobileOpen } = props;
  return (
    <Fragment>
      <AppBar className={classes.toolbar}>
        <Toolbar>
          {isWidthUp("sm", width) ? (
            <AuthWideScreenNavigation classes={classes} />
          ) : (
              <SmallScreenNavigation
                classes={classes}
                handleDrawerToggle={handleDrawerToggle}
              />
            )}
        </Toolbar>
      </AppBar>
      <AuthDrawer
        theme={theme}
        classes={classes}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Fragment>
  );
};

const NavigationNonAuth = props => {
  const { classes, width, theme, handleDrawerToggle, mobileOpen } = props;
  return (
    <Fragment>
      <AppBar className={classes.toolbar}>
        <Toolbar>
          {isWidthUp("sm", width) ? (
            <NonAuthWideScreenNavigation classes={classes} />
          ) : (
              <SmallScreenNavigation
                classes={classes}
                handleDrawerToggle={handleDrawerToggle}
              />
            )}
        </Toolbar>
      </AppBar>
      <NonAuthDrawer
        theme={theme}
        classes={classes}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Fragment>
  );
};

const AuthWideScreenNavigation = props => {
  const { classes } = props;
  return <Fragment>{authNavbarListItems}</Fragment>;
};

const NonAuthWideScreenNavigation = props => {
  const { classes } = props;
  return <Fragment>{nonAuthDrawerListItems}</Fragment>;
};

const SmallScreenNavigation = props => {
  const { classes, handleDrawerToggle } = props;
  console.log("smallscreen");
  return (
    <Fragment>
      <IconButton
        onClick={handleDrawerToggle}
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" className={classes.flex}>
        MyBoardGameCollection o/
      </Typography>
    </Fragment>
  );
};

const AuthDrawer = props => {
  const { classes, theme, handleDrawerToggle, mobileOpen } = props;
  return (
    <Drawer
      variant="temporary"
      anchor={theme.direction === "rtl" ? "right" : "left"}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper
      }}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
    >
      <List>{authDrawerListItems}</List>
    </Drawer>
  );
};

const NonAuthDrawer = props => {
  const { classes, theme, handleDrawerToggle, mobileOpen } = props;
  return (
    <Drawer
      variant="temporary"
      anchor={theme.direction === "rtl" ? "right" : "left"}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper
      }}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
    >
      {nonAuthDrawerListItems}
    </Drawer>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};
NavigationAuth.propTypes = {
  classes: PropTypes.object.isRequired
};
NavigationNonAuth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(Navigation));
