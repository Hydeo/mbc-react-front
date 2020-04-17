import React, { Component, Fragment } from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import{
  create_new_game 
} from '../../actions/game_actions';
import { createLoadingSelector } from '../../selectors/selectors';
import { I18n, Trans } from "react-i18next";

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

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      age_recommended: 0,
      nb_player_min: 0,
      nb_player_max: 0,
      time_to_play: 0,
      complexity: 0,
      url_image: "https://via.placeholder.com/300x300",
      description: "",
      tags_view :[],
      tags : {}
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleTagsChange = name =>event =>{

    var tags_objects =  event.target.value.map((e)=>{
      return {"_id" : e}
    })
     this.setState({
      "tags_view" : event.target.value,
      "tags": tags_objects
    });
  }

  validate = () =>{
    return true;
  }
  
  onSubmitGame = () =>{
    if(this.validate()){
      this.props.create_new_game(this.state);
    }
  }


  render() {
    const { classes } = this.props;

    const tags_c = this.props.tags.map(function(e){
      return(
        <option value={e._id}>{e.localization[this.cur_lang].trad}</option>
      )
    },this.props.i18n)

    return (
    <I18n ns="translations">
    {(t, { i18n }) => (
      <Fragment>
        <div>
          <div>
            <h1>🎲 {t("create_game.title")} 🎲</h1>
            <h2>Is Fetching : {this.props.isFetching ? "Yes" : "No"} </h2>
            <p>{t("create_game.instructions")}</p>
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
                />
                <TextField
                  id="url_image"
                  label="Url Cover"
                  className={classes.textField}
                  value={this.state.url_image}
                  onChange={this.handleChange("url_image")}
                  margin="normal"
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
                  />
                  <TextField
                    id="complexity"
                    label="Complexity"
                    className={classes.textField}
                    value={this.state.complexity}
                    onChange={this.handleChange("complexity")}
                    margin="normal"
                  />
                </Fragment>
              </Grid>

              <Grid md={9} xs={10}>
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

                  

                  <Grid item md={9} xs={10}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="tags">
                        Tags
                      </InputLabel>
                      <Select
                        value={this.state.tags_view}
                        onChange={this.handleTagsChange()}
                        multiple 
                        inputProps={{
                          name: "tags",
                          id: "tags"
                        }}
                      >
                        {tags_c}
                      </Select>
                    </FormControl>
                  </Grid>
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
                    />
                  </Grid>
                </Fragment>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item md={3} xs={10}>
              <Button
                disabled = {this.props.isFetching}
                onClick={this.onSubmitGame}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Create Game
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fragment>
      )}
      </I18n>
    );
  }
}

const loadingSelector = createLoadingSelector(['CREATE_NEW_GAME']);
const mapStateToProps = state =>({
    tags : state.tags,
    i18n : state.i18n,
    isFetching: loadingSelector(state.loading_reducer)
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create_new_game
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CreateGame));
