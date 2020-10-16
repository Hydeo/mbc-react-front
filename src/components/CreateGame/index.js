import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    createNewGame
} from '../../actions/game_actions';
import {
    createGameMask
} from '../../actions/game_collection_actions';
import { createLoadingSelector } from '../../selectors/selectors';
import { I18n, Trans } from "react-i18next";
import _ from 'lodash';

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
import { conf_dev } from "../../config";

export const MODES_CRUD_GAME_VIEW = {
    "CREATE": "CREATE",
    "UPDATE": "UPDATE",
    "EDIT": "EDIT"
}

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },

    divSpacer: {
        height: theme.spacing.unit * 4
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
    image_container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

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

//TODO: separate creation and edition 

class CreateGame extends Component {

    constructor(props) {
        super(props);

        var init_state = {
            game: null,
            title: "",
            age_recommended: 5,
            nb_player_min: 1,
            nb_player_max: 4,
            time_to_play_min: 10,
            time_to_play_max: 30,
            complexity: 0,
            imageUrl: "",
            description: "",
            tags: {},

            tags_view: [],
            error_title: false,
            error_imageUrl: false,
            error_tags: false,

            tags_dico: this.generateTagDico(),
            //Creation or Edition
            mode: MODES_CRUD_GAME_VIEW.hasOwnProperty(props.mode) ? props.mode : "CREATE",
            cur_lang: "eng"
        }

        //If we receive a game as prop to modify it
        if (props.mode && props.mode == MODES_CRUD_GAME_VIEW.EDIT && this.props.propGame) {
            init_state = {
                ...init_state,
                game : props.propGame,
                ...this.propsGameToSate(props.propGame, init_state)
            }
        }

        this.state = {
            ...init_state
        };
    }

    propsGameToSate = (propGame, initState) => {

        var pre_selected_tags = initState.tags_dico.filter((e) => {
            for (var i = 0; i < propGame.getTags().length; i++) {
                if (e.id == propGame.getTags()[i].getId())
                    return true;
            }
            return false;
        });

        var prop_game_loaded = {
            ...propGame,
            "title": propGame.getTitle(),
            "imageUrl": propGame.getImageUrl(),
            "tags_view": pre_selected_tags,
            "tags": this.mapSelectedTags(pre_selected_tags)
        }
        return prop_game_loaded;
    }

    generateTagDico = () => {
        var tags_dico = _.map(
            this.props.game_tags,
            _.bind(function(e, key, index, context) {
                return ({ title: this.game_tags[e.getId()].getTrad(this.i18n.cur_lang), id: e.getId() })
            }, this.props)
        );
        return Object.values(tags_dico);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    mapSelectedTags = (v) => {
        return _.map(v,
            _.bind((e) => {
                return this.props.game_tags[e.id];
            }, this.props)
        )
    }

    handleTagsChange = (event, newValues) => {
        var tags_objects = this.mapSelectedTags(newValues);
        this.setState({
            "tags": tags_objects
        });
    }

    validate = () => {
        var status = true;
        var state_errors = {
            error_title: false,
            error_tags: false,
            error_imageUrl: false
        };

        if (this.state.title == "") {
            state_errors.error_title = true;
            status = false;
        }
        if (Object.keys(this.state.tags).length == 0) {
            state_errors.error_tags = true;
            status = false;
        }
        if (!Utils.is_url(this.state.imageUrl)) {
            state_errors.error_imageUrl = true;
            status = false;
        }

        this.setState({ ...state_errors })

        return status;
    }

    onSubmitGame = () => {
        console.log(this.state);
        if (this.validate()) {
            switch (this.state.mode) {
                case MODES_CRUD_GAME_VIEW["CREATE"]:
                    this.props.createNewGame(this.state);
                    break;

                case MODES_CRUD_GAME_VIEW["EDIT"]:
                    this.props.createGameMask(this.state);
                    break;

                default:
                    alert("Unknown Mode");
                    break;
            }
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

    handleAgeRecommandedChange = (event, newValue) => {
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

    componentDidMount = () => {

    }

    render() {
        const { classes } = this.props;
        return (
            <I18n ns="translations">
        {(t, { i18n }) => (
          <Fragment>
            <div>
              <div>
                <h1>🎲 {t("create_game.title")} 🎲</h1>
                <h2>Is Fetching : {this.props.isFetching ? "Yes" : "No"} </h2>
                <p>{t("create_game.instructions")}</p>
                <p>Current Mode : {this.state.mode}</p>
              </div>

              <Grid container justify="center">
                <Grid item md={5} xs={10} className={classes.image_container}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={this.state.imageUrl == "" ? conf_dev.url_fallback_img : this.state.imageUrl}
                    alt="BoardGame Picture"
                  />
                </Grid>
                <Grid item md={1} xs={0}/>
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
                        id="imageUrl"
                        label="Board Game Image URL"
                        fullWidth={true} 
                        className={classes.textField}
                        value={this.state.imageUrl}
                        onChange={this.handleChange("imageUrl")}
                        margin="normal"
                        error = {this.state.error_imageUrl}
                      />
                      
                      
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={this.state.tags_dico}
                        getOptionLabel={(option) => option.title}
                        filterSelectedOptions
                        onChange={this.handleTagsChange}
                        defaultValue = {this.state.tags_view}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Board Game Tags"
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
                    {this.state.mode} Game
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
    game_tags: state.tags,
    i18n: state.i18n,
    isFetching: loadingSelector(state.loading)
})


const mapDispatchToProps = dispatch =>
    bindActionCreators({
            createNewGame,
            createGameMask
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateGame));