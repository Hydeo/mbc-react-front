import React, { Component, Fragment } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from "i18next";
import {
  create_game_mask
} from '../../actions/game_collection_actions';
import Utils from "../../utils";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  }
});

class MaskEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      age_recommended: "",
      nb_player_min: "",
      nb_player_max: "",
      time_to_play: "",
      complexity: "",
      url_image: "",
      description: "",
      comment: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  validate = () => {
    //TODO validation
    return true;
  }

  onSubmitMask = () => {
    if (this.validate()) {
      this.props.create_game_mask(this.state);
    }
  }

  componentDidMount = () => {
    if (i18n.language != undefined) {
      var game_data = this.props.location.state.game_data;
      var game_mask = this.props.location.state.game_mask;

      Utils.apply_game_mask(game_data, game_mask);

      this.setState({
        id: game_data._id,
        title: Utils.get_game_localized_property(game_data, "title"),
        age_recommended: game_data.age_recommended,
        nb_player_min: game_data.nb_player_min,
        nb_player_max: game_data.nb_player_max,
        time_to_play: game_data.time_to_play,
        complexity: game_data.complexity,
        url_image: Utils.get_game_localized_property(game_data, "imageUrl"),
        description: Utils.get_game_localized_property(game_data, "description"),
        comment: game_data.comment
      });
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div>
          <div>
            <h1>🏁 Mask Editor 🏁</h1>
            <h2>Here you can edit the information of a game as you please. These modifications are personnal, and will only show on your list</h2>
          </div>

          <Grid container justify="center" spacing={8}>
            <Grid item md={3} xs={10}>
              <img
                style={{ maxWidth: "100%" }}
                src={this.state.url_image}
                alt="BoardGame Picture"
              />
            </Grid>

            <Grid item md={5} xs={10}>
              <Grid item md={6} xs={10}>
                <TextField
                  id="title"
                  label="Title"
                  className={classes.textField}
                  value={this.state.title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                  disabled={true}
                />
              </Grid>
              <Grid item md={9} xs={10}>
                <Fragment>
                  <TextField
                    id="time_to_play"
                    label="Time to Play"
                    className={classes.textField}
                    value={this.state.time_to_play}
                    onChange={this.handleChange("time_to_play")}
                    margin="normal"
                    disabled={true}
                  />
                  <TextField
                    id="complexity"
                    label="Complexity"
                    className={classes.textField}
                    value={this.state.complexity}
                    onChange={this.handleChange("complexity")}
                    margin="normal"
                    disabled={true}
                  />
                </Fragment>
              </Grid>

              <Grid item md={9} xs={10}>
                <Fragment>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age_recommended">
                      Recommended Age
                    </InputLabel>
                    <Select
                      native
                      value={this.state.age_recommended}
                      onChange={this.handleChange("age_recommended")}
                      inputProps={{
                        name: "age_recommended",
                        id: "age_recommended"
                      }}
                      disabled={true}
                    >
                      <option value="" />
                      <option value={10}>Ten</option>
                      <option value={20}>Twenty</option>
                      <option value={30}>Thirty</option>
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="nb_player_min">
                      Minimum players
                    </InputLabel>
                    <Select
                      native
                      value={this.state.nb_player_min}
                      onChange={this.handleChange("nb_player_min")}
                      inputProps={{
                        name: "nb_player_min",
                        id: "nb_player_min"
                      }}
                      disabled={true}
                    >
                      <option value="" />
                      <option value={10}>Ten</option>
                      <option value={20}>Twenty</option>
                      <option value={30}>Thirty</option>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="nb_player_max">
                      Maximun players
                    </InputLabel>
                    <Select
                      native
                      value={this.state.nb_player_max}
                      onChange={this.handleChange("nb_player_max")}
                      inputProps={{
                        name: "nb_player_max",
                        id: "nb_player_max"
                      }}
                      disabled={true}
                    >
                      <option value="" />
                      <option value={10}>Ten</option>
                      <option value={20}>Twenty</option>
                      <option value={30}>Thirty</option>
                    </Select>
                  </FormControl>
                </Fragment>
              </Grid>
              
                <Fragment>
                  <Grid item md={9} xs={10}>
                    <TextField
                      id="description"
                      label="Description"
                      className={classes.textField}
                      value={this.state.description}
                      onChange={this.handleChange("description")}
                      multiline={true}
                      fullWidth
                      margin="normal"
                      disabled={true}
                    />
                  </Grid>
                  <Grid item md={9} xs={10}>
                    <TextField
                      id="comment"
                      label="Comment"
                      className={classes.textField}
                      value={this.state.comment}
                      onChange={this.handleChange("comment")}
                      multiline={true}
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                </Fragment>
              
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item md={3} xs={10}>
              <Button
                onClick={this.onSubmitMask}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Apply Mask
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fragment >
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create_game_mask
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MaskEditor));
