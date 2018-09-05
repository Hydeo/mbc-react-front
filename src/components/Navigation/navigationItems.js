import React, { Fragment } from "react";

import * as routes from "../../constants/routes";
import { Link } from "react-router-dom";

import LangSwitcher from "./langSwitcher";

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

import { I18n, Trans } from "react-i18next";

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
  <I18n ns="translations">
    {(t, { i18n }) => (
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
                  {t("navigation.landing")}
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
                  {t("navigation.my_collection")}
                </Typography>
              }
            />
          </ListItem>
        </Link>
        <div style={styleLogoNavBar.container}>
          <div style={styleLogoNavBar.widthCalibration}>
            <img src="/images/logo-ss.png" alt="qzd" />
          </div>
          <img
            style={styleLogoNavBar.logo}
            src="/images/logo-ss.png"
            alt="qzd"
          />
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
                  {t("navigation.my_account")}
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
        <LangSwitcher />
      </Fragment>
    )}
  </I18n>
);

export const authDrawerListItems = (
  <I18n ns="translations">
    {(t, { i18n }) => (
      <Fragment>
        <Link to={routes.LANDING}>
          <ListItem style={styleListItem} button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary= {t("navigation.landing")} />
          </ListItem>
        </Link>

        <Link to={routes.HOME}>
          <ListItem style={styleListItem} button>
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
            <ListItemText primary= {t("navigation.my_collection")} />
          </ListItem>
        </Link>

        <Link to={routes.ACCOUNT}>
          <ListItem style={styleListItem} button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={t("navigation.my_account")} />
          </ListItem>
        </Link>

        <ListItem style={styleListItem} button>
          <SignOutButton />
        </ListItem>
      </Fragment>
    )}
  </I18n>
);

/*This one is used for wide & mobile thanks to the Hidden*/

export const nonAuthDrawerListItems = (
  <I18n ns="translations">
    {(t, { i18n }) => (
      <Fragment>
        <Link to={routes.LANDING}>
          <ListItem style={styleListItem} button>
            <Hidden smUp>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary= {t("navigation.landing")} />
            </Hidden>
            <Hidden xsDown>
              <ListItemIcon>
                <HomeIcon style={{ color: "white" }} color={"inherit"} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subheading" style={{ color: "#FFFFFF" }}>
                     {t("navigation.landing")}
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
              <ListItemText primary= {t("navigation.sign_in")} />
            </Hidden>
            <Hidden xsDown>
              <ListItemIcon>
                <InputIcon style={{ color: "white" }} color={"inherit"} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subheading" style={{ color: "#FFFFFF" }}>
                    {t("navigation.sign_in")}
                  </Typography>
                }
              />
            </Hidden>
          </ListItem>
        </Link>
      </Fragment>
    )}
  </I18n>
);
