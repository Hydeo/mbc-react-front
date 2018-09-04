import React, {Fragment} from 'react';

import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputIcon from '@material-ui/icons/Input';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

import SignOutButton from '../SignOut';
const styleListItem = {
    width : "unset"
}
export const authDrawerListItems = (
    <Fragment> 

        <Link to={routes.LANDING}>
            <ListItem style={styleListItem} button>
            <ListItemIcon>
                <HomeIcon/>
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

export const nonAuthDrawerListItems = (
    <Fragment> 

        <Link to={routes.LANDING}>
            <ListItem style={styleListItem} button>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Landing" />
            </ListItem>
        </Link>

        <Link to={routes.SIGN_IN}>
            <ListItem style={styleListItem} button>
            <ListItemIcon>
                <InputIcon />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
            </ListItem>
        </Link>

    </Fragment>
);