import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
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
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Utils from "../../utils";

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },

    divSpacer : {
      height : theme.spacing.unit*4
    },

    sliderMargin: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },

    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },

    button: {
        margin: theme.spacing.unit
    },

    image_container :{
        display: "flex",
        alignItems: "center"
    }
});

const default_cover_url = "https://tof.cx/images/2020/05/04/b1aced89d62e6505d1f141655b5964e7.png";
const recommended_age_marks = [{
        value: 5,
        label: '5+',
    },
    {
        value: 7,
        label: '7+',
    },
    {
        value: 10,
        label: '10+',
    },
    {
        value: 12,
        label: '12+',
    },
    {
        value: 16,
        label: '16+',
    },
    {
        value: 18,
        label: '18+',
    }
];


class CreateGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            age_recommended: 5,
            nb_player_min: 1,
            nb_player_max: 4,
            time_to_play_min: 10,
            time_to_play_max: 30,
            complexity: 0,
            url_image: "",
            description: "",
            tags: {},

            tags_view: [],
            error_title : false,
            error_url_image :false,
            error_tags : false,

        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleTagsChange = (event,newValues) => {
        var tags_objects = newValues.map((e) => {
            return { "_id": e.id }
        })
        this.setState({
            "tags": tags_objects
        });
    }

    validate = () => {
        var status = true;
        var state_errors = {
            error_title : false,
            error_tags : false,
            error_url_image : false
        };

        if(this.state.title == ""){
            state_errors.error_title = true; 
            status = false;
        }
        if(Object.keys(this.state.tags).length == 0){
            state_errors.error_tags = true;
            status = false;
        }
        if(!Utils.is_url(this.state.url_image)){
           state_errors.error_url_image = true;
           status = false;
        }

        this.setState({...state_errors})

        return status;
    }

    onSubmitGame = () => {
      console.log(this.state);
        if (this.validate()) {        
            this.props.create_new_game(this.state);
        }
    }

    handlePlayingTimeChange = (event, newValue) => {
        this.setState({
            time_to_play_min: newValue[0],
            time_to_play_max: newValue[1]
        });
    }
    handleNumberOfPlayerChange = (event, newValue) => {
        this.setState({
            nb_player_min: newValue[0],
            nb_player_max: newValue[1]
        });
    }

    handleAgeRecommandedChange = (event, newValue)=>{
        this.setState({
            age_recommended: newValue
        });
    }

    createSliderMarksWithLabel = (min, max, step, label_spaceing) => {
        var marks_array = [];
        var bool_first_mark = true;
        for (var i = min; i <= max; i = i + step) {
            var cur = { value: i }
            if (i % label_spaceing == 0 || bool_first_mark) {
                bool_first_mark = false;
                cur["label"] = i;
            }
            marks_array.push(cur)
        }
        return marks_array;
    }

    render() {
        const { classes } = this.props;

        const tags_dico = this.props.tags.map(function(e) {
            return (
                {title: e.localization[this.cur_lang].trad, id : e._id}
            )
        }, this.props.i18n)

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
                <Grid item md={3} xs={10} className={classes.image_container}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={this.state.url_image == "" ? default_cover_url : this.state.url_image}
                    alt="BoardGame Picture"
                  />
                </Grid>

                <Grid item md={5} xs={10}>
                  
                      <TextField
                        id="title"
                        label="Board Game Name"
                        fullWidth
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        margin="normal"
                        error = {this.state.error_title}
                      />

                      <TextField
                        id="url_image"
                        label="Board Game Image URL"
                        fullWidth={true} 
                        className={classes.textField}
                        value={this.state.url_image}
                        onChange={this.handleChange("url_image")}
                        margin="normal"
                        error = {this.state.error_url_image}
                      />
                      
                      
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={tags_dico}
                        getOptionLabel={(option) => option.title}
                        filterSelectedOptions
                        onChange={this.handleTagsChange}
                        
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Board Game Tags"
                            placeholder="Favorites"
                            error = {this.state.error_tags}
                          />
                        )}
                      />

                   
                      <div className={classes.divSpacer}></div>
                      <Typography id="discrete-slider" gutterBottom>
                        Recommended Age
                      </Typography>
                      <Slider
                        className={classes.sliderMargin}
                        defaultValue={this.state.age_recommended}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        onChangeCommitted={this.handleAgeRecommandedChange}
                        step={null}
                        marks = {recommended_age_marks}
                        min = {recommended_age_marks[0].value}
                        max = {recommended_age_marks[recommended_age_marks.length-1].value}
                      />
                      
                      <Typography id="discrete-slider" gutterBottom>
                          Playing Time
                      </Typography>
                      <Slider
                        className={classes.sliderMargin}
                        defaultValue={[this.state.time_to_play_min,this.state.time_to_play_max]}
                        getAriaValueText={(value)=>{return "${values}min"}}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        onChangeCommitted={this.handlePlayingTimeChange}
                        step={10}
                        min={10}
                        max={240}
                        marks = {this.createSliderMarksWithLabel(10,240,10,30)}
                      />

                      <Typography id="discrete-slider" gutterBottom>
                          Number of Players
                      </Typography>
                      <Slider
                        className={classes.sliderMargin}
                        defaultValue={[this.state.nb_player_min,this.state.nb_player_min]}
                        getAriaValueText={(value)=>{return "${values}min"}}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        onChangeCommitted={this.handleNumberOfPlayerChange}
                        step={1}
                        min={1}
                        max={10}
                        marks = {this.createSliderMarksWithLabel(1,10,1,1)}
                      />                 
                    
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
const mapStateToProps = state => ({
    tags: state.tags,
    i18n: state.i18n,
    isFetching: loadingSelector(state.loading)
})


const mapDispatchToProps = dispatch =>
    bindActionCreators({
            create_new_game
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateGame));