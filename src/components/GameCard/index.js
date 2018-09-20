import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%",
        overflow: 'hidden',
    },
    alignTextItem: {
        display: "flex",
        alignItems: "center"
    }

});

function GameCard(props) {
    const { classes } = props;
    
    return (
        <div className="container link_item">

            <img className="cover" src={props.url} alt="qzd" />
            <div className="overlay" />
            <div className="info">

                <div style={{ height: "100%" }}>
                    <Grid container className={classes.root}>
                        <Grid container
                            justify="center">
                            <Grid item>
                                GLOOMHEAVEN
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid
                                container
                                className={classes.demo}
                                direction="column"
                                justify="space-evenly"
                                alignItems="flex-start"
                            >
                                <Grid item className={classes.alignTextItem}>
                                    <img width="25" height="25" src="/images/icons/nbPlayer.svg" alt="Kiwi standing on oval"></img>
                                    2 - 4
                                </Grid>
                                <Grid item className={classes.alignTextItem}>
                                    <img width="25" height="25" src="/images/icons/age.svg" alt="Kiwi standing on oval"></img>
                                    12+
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid
                                container
                                className={classes.demo}
                                direction="column"
                                justify="space-evenly"
                                alignItems="flex-end"
                            >
                                <Grid item className={classes.alignTextItem}>
                                    3.5
                                    <img width="25" height="25" src="/images/icons/complexity.svg" alt="Kiwi standing on oval"></img>
                                </Grid>
                                <Grid item className={classes.alignTextItem}>
                                    40-80
                                    <img width="25" height="25" src="/images/icons/time.svg" alt="Kiwi standing on oval"></img>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container wrap="nowrap" spacing={2} style={{ maxHeight: "30%" }}>
                            <Grid item xs={2} className={classes.alignTextItem}>
                                <img width="25" height="25" src="/images/icons/categories.svg" alt="Kiwi standing on oval"></img>
                            </Grid>
                            <Grid item xs={10}   style={{overflow : "hidden",textOverflow: "ellipsis"}}>
                                 qzd - zqd qzd - qzd -dfdvdrvdrv - srfdazdq - qzd qzddrgdr - sfrhsiuhf - qiedjiosejfio - uqhdqdz - iquzdhiozq - qkzdjizqjd - qzjdizqjd  - qjkzdhqzh - jqzdihqzd - oiqjzdizqd
                                
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
            </div>
        </div>
    );
}

GameCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameCard);