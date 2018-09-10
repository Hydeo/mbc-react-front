import React, { Component, Fragment } from "react";

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

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      age_recommended: 0,
      nb_player_min: 0,
      nb_player_max: 0,
      time_to_play: 0,
      url_image: "",
      description: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div>
          <h1>🏁 React Final Form</h1>
          <h2>Material UI Example</h2>
          <a href="https://github.com/erikras/react-final-form#-react-final-form">
            Read Docs
          </a>
          <p>
            This example demonstrates using{" "}
            <a href="https://material-ui.com/api/form-control/#formcontrol">
              Material UI
            </a>{" "}
            form controls.
          </p>
        </div>
        <div className={classes.root}>

          <Grid container spacing={8}>

            <Grid item md={3} xs={10}>
              <img
              style={{maxWidth :"100%"}}
                src="https://via.placeholder.com/300x300"
                alt="BoardGame Picture"
              />
            </Grid>

            <Grid item md={9} xs={10}>
              <Grid container spacing={8}>
                <TextField
                  id="title"
                  label="Title"
                  value={this.state.title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                />
                <TextField
                  id="url_image"
                  label="Url Cover"
                  value={this.state.url_image}
                  onChange={this.handleChange("url_image")}
                  margin="normal"
                />

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
                  >
                    <option value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </Select>
                </FormControl>

                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleChange("description")}
                    multiline={true}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default withStyles(styles)(CreateGame);
