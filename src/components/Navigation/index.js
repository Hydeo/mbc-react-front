import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 240;

const styles = theme =>({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class Navigation extends React.Component {
  state = {
    mobileOpen : false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render(){
    const { classes, theme } = this.props;
    return(
      <div className={classes.root}>
        <AppBar className={classes.toolbar}>
            <AuthUserContext.Consumer>
              {authUser => authUser
                ? <NavigationAuth classes={classes} handleDrawerToggle={this.handleDrawerToggle}/>
                : <NavigationNonAuth classes={classes} handleDrawerToggle={this.handleDrawerToggle}/>
              }
            </AuthUserContext.Consumer>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            <Typography variant="button" color="inherit" className={classes.flex}>
            <Link to={routes.LANDING}>Landing</Link>
            </Typography>
            <Typography variant="button" color="inherit" className={classes.flex}>
            <Link to={routes.HOME}>Home</Link>
            </Typography>
            <Typography variant="button" color="inherit" className={classes.flex}>
            <Link to={routes.ACCOUNT}>Account</Link>
            </Typography>
            <Typography variant="button" color="inherit" className={classes.flex}>
              <SignOutButton />
            </Typography>
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </div>
    )
  }
}

const NavigationAuth = (props) =>{
  const { classes, handleDrawerToggle } = props;
  return(
    
      <Toolbar>
        <Hidden smDown>
          {/* AUTHED AppBar rendered for =DESKTOP= */}
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Link to={routes.LANDING}>Landing</Link>
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
          <Link to={routes.HOME}>Home</Link>
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
          <Link to={routes.ACCOUNT}>Account</Link>
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <SignOutButton />
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={handleDrawerToggle} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
              MyBoardGameCollection o/
          </Typography>
        </Hidden>
      </Toolbar>
    
  )
}

const NavigationNonAuth = (props) =>{
  
  const { classes, handleDrawerToggle } = props;
  return(
    <Toolbar>
      <IconButton onClick={handleDrawerToggle} className={classes.menuButton} color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" className={classes.flex}>
        <Link to={routes.LANDING}>Landing</Link>
      </Typography>
      <Typography variant="title" color="inherit" className={classes.flex}>
        <Link to={routes.SIGN_IN}>Sign In</Link>
      </Typography>
    </Toolbar>
  )
}


Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};
NavigationAuth.propTypes = {
  classes: PropTypes.object.isRequired,
};
NavigationNonAuth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);
