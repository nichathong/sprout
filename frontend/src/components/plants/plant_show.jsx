import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import NavbarContainer from "../nav/navbar_container";
import './plant_show.css'
import { capitalizeName } from "../../helpers/random_helpers";

class PlantShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            errors:{},

            name: "",
            level: "",
            waterLevel: "",
            waterFrequency: "",
            light: "",
            temperatureMin: "",
            temperatureMax: "",
            photoUrls: [],

            tags: {
                isIndoor: false,
                isOutdoor: false,
                isSucculent: false,
                isFlowering: false,
                isPoisonous: false,
                isExotic: false,
                isMultiColored: false,
                isHanging: false
            }
        };

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this._resetForm = this._resetForm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    
    componentDidMount() {
        this.props.fetchAllPlants();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors });
    }

    _resetForm() {
        // Fixing tags format here
        let formattedTags;
        if (this.props.plant.tags.length === 1 && this.props.plant.tags[0].includes(",")) {
            formattedTags = this.props.plant.tags[0].split(",");
        } else {
            formattedTags = this.props.plant.tags;
        }

        this.setState({
            showForm: false,
            errors:{},

            name: this.props.plant.name,
            level: this.props.plant.level,
            waterLevel: this.props.plant.waterLevel,
            waterFrequency: this.props.plant.waterFrequency,
            light: this.props.plant.light,
            temperatureMin: this.props.plant.temperature === "" ? undefined : parseInt(this.props.plant.temperature.split("-")[0]),
            temperatureMax: this.props.plant.temperature === "" ? undefined : parseInt(this.props.plant.temperature.split("-")[1]),
            photoUrls: this.props.plant.photoUrls,
            url:null,
            file:null,

            tags: {
                isIndoor: formattedTags.includes("isIndoor") ? true : false,
                isOutdoor: formattedTags.includes("isOutdoor") ? true : false,
                isSucculent: formattedTags.includes("isSucculent") ? true : false,
                isFlowering: formattedTags.includes("isFlowering") ? true : false,
                isPoisonous: formattedTags.includes("isPoisonous") ? true : false,
                isExotic: formattedTags.includes("isExotic") ? true : false,
                isMultiColored: formattedTags.includes("isMultiColored") ? true : false,
                isHanging: formattedTags.includes("isHanging") ? true : false
            }
        });
    }


    update(field) {
        return e => {
            if (field === "waterLevel" || field === "light") {
                this.setState({ [field]: parseInt(e.currentTarget.value) });
            } else if (field === "level") {
                this.setState({ [field]: e.target.value });
            } else if (field === "isIndoor" || field === "isOutdoor" || field === "isSucculent"
                || field === "isFlowering" || field === "isPoisonous" || field === "isExotic"
                || field === "isMultiColored" || field === "isHanging") {

                let tags = this.state.tags;
                tags[field] ? tags[field] = false : tags[field] = true;
                this.setState({ tags })
            } else {
                this.setState({ [field]: e.currentTarget.value });
            }
            this.setState({errors: {}})
        }
    }


    handleSubmit(e) {
        e.preventDefault();
       
        let tags = this.state.tags;
        let selectedTags = [];
        for (let i in tags) {
            if (tags[i]) selectedTags.push(i);
        }

        this.props.updatePlant({
            id: this.props.plant._id ? this.props.plant._id : this.props.plant.id,
            author: this.props.currentUser.id,
            name: this.state.name,
            level: this.state.level,
            waterLevel: this.state.waterLevel,
            waterFrequency: this.state.waterFrequency,
            light: this.state.light,
            temperature: `${this.state.temperatureMin}-${this.state.temperatureMax}`,
            photoUrls: this.state.photoUrls,
            tags: selectedTags
        }).then(() => (this.handleError()));
    }

    handleError(){
        if(Object.keys(this.state.errors).length === 0){
            this._resetForm();
         }
    }

    renderErrors() {
        return (
          <ul>
            {Object.keys(this.state.errors).map((error, i) => (
              <li key={`error-${i}`}>{this.state.errors[error]}</li>
            ))}
          </ul>
        );
      }



    handleClose(e) {
        e.preventDefault();
        this._resetForm();
    }


    handleDelete(e) {
        e.preventDefault();
        this.props.deletePlant(this.props.plant._id)
            .then(() => this.props.history.push("/plants"));
    }

    handleOpen(e) {
        e.preventDefault();
        this._resetForm();
        this.setState({ showForm: true });
    }


    render() {
        const { plant, currentUser } = this.props;
        const preview = this.state.url ? <img src={this.state.url} /> : null;
        const editForm = plant ?
            <div className="edit-plant-form-anchor">
                <form className="edit-plant-form" onSubmit={this.handleSubmit}>
                    <div className="edit-form-close" onClick={this.handleClose}>x</div>
                    {/* {this.renderErrors()} */}
                    <div className="edit-plant-form-header-anchor">
                        <h1 className="edit-plant-form-header">Update your Plant</h1>
                    </div>

                    <div className="edit-plant-form-sub-container">
                        <label className = "name2">Name
                            <input className = "nameText2" type="text" value={this.state.name} onChange={this.update("name")} />
                        </label>

                        <label className = "difficulty2">Difficulty
                            <select className = "difficultyText2" onChange={this.update("level")} value={this.state.level}>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </label>

                        <label className="sunlight2">Amount of Sunlight
                            <input type="radio" name="light" value={1} onChange={this.update("light")} defaultChecked={1 === plant.light} />{1}
                            <input type="radio" name="light" value={2} onChange={this.update("light")} defaultChecked={2 === plant.light} />{2}
                            <input type="radio" name="light" value={3} onChange={this.update("light")} defaultChecked={3 === plant.light} />{3}
                            <input type="radio" name="light" value={4} onChange={this.update("light")} defaultChecked={4 === plant.light} />{4}
                            <input type="radio" name="light" value={5} onChange={this.update("light")} defaultChecked={5 === plant.light} />{5}
                        </label>

                        <label className="wateringFrequency2">Watering Frequency
                            <input type="radio" name="watering-frequency" value={1} onChange={this.update("waterLevel")} defaultChecked={1 === plant.waterLevel} />{1}
                            <input type="radio" name="watering-frequency" value={2} onChange={this.update("waterLevel")} defaultChecked={2 === plant.waterLevel} />{2}
                            <input type="radio" name="watering-frequency" value={3} onChange={this.update("waterLevel")} defaultChecked={3 === plant.waterLevel} />{3}
                            <input type="radio" name="watering-frequency" value={4} onChange={this.update("waterLevel")} defaultChecked={4 === plant.waterLevel} />{4}
                            <input type="radio" name="watering-frequency" value={5} onChange={this.update("waterLevel")} defaultChecked={5 === plant.waterLevel} />{5}
                        </label>

                        <label className = "days2">How often should the plant be watered (in days)?
                            <input className="daysBox2"type="numbers" min="0" max="1000" value={this.state.waterFrequency} onChange={this.update("waterFrequency")} />
                        </label>

                        <label className="temperature2">Ideal Temperature Range
                            <input  className="temperature-input2" type="numbers" min="0" max="300" value={this.state.temperatureMin} onChange={this.update("temperatureMin")} />
                            -
                            <input className="temperature-input2" type="numbers" min="0" max="300" value={this.state.temperatureMax} onChange={this.update("temperatureMax")} />
                        </label>

                        <label className = "tags2"> Select all that apply!
                            <input type="checkbox" name="tags" onChange={this.update("isIndoor")} checked={this.state.tags.isIndoor} />Indoor
                            <input type="checkbox" name="tags" onChange={this.update("isOutdoor")} checked={this.state.tags.isOutdoor} />Outdoor
                            <input type="checkbox" name="tags" onChange={this.update("isSucculent")} checked={this.state.tags.isSucculent} />Succulent
                            <input type="checkbox" name="tags" onChange={this.update("isFlowering")} checked={this.state.tags.isFlowering} />Flowering
                            <input type="checkbox" name="tags" onChange={this.update("isPoisonous")} checked={this.state.tags.isPoisonous} />Poisonous
                            <input type="checkbox" name="tags" onChange={this.update("isExotic")} checked={this.state.tags.isExotic} />Exotic
                            <input type="checkbox" name="tags" onChange={this.update("isMultiColored")} checked={this.state.tags.isMultiColored} />Multi-colored
                            <input type="checkbox" name="tags" onChange={this.update("isHanging")} checked={this.state.tags.isHanging} />Hanging
                        </label>

                        <input className = "submit-update-plant" type="submit" value="Update Plant" />
                    </div>



                </form>
            </div> : null;


        return plant ? (
          <div className="plant-show-container">

            <div className="navbar-contianer">
              <NavbarContainer />
            </div>
            {this.state.showForm ? editForm : null}

            <div className="plant-show-content-container">
              <div className="show-content">
                <div className="back-to-list-anchor">
                    <Link className="back-to-list" to="/plants">
                        <img className="previous-icon" src="previous.png" alt="" />
                    </Link>
                </div>

                {currentUser.id === plant.author ? (
                    <div className="plant-show-edit-buttons-container">
                        <button
                            className="plant-show-edit-button"
                            onClick={this.handleOpen}
                        >
                            Edit
                        </button>
                        <button
                            className="plant-show-delete-button"
                            onClick={this.handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                ) : null}

                <img className="plant-image" src={plant.photoUrls[0]} alt="" />
                <div className="information">
                  <h1 className="plant-name">{capitalizeName(plant.name)}</h1>

                  <ul className="plant-info">
                    <li>
                      Difficulty:{" "}
                      {plant.level.charAt(0).toUpperCase() +
                        plant.level.slice(1)}
                    </li>
                    <li>Days Between Watering: {plant.waterFrequency}</li>
                    <li>Watering Rating: {plant.waterLevel}</li>
                    <li>Sunlight Rating: {plant.light}</li>

                    {plant.temperature === "0-0" ? null : (
                      <li>Ideal Temperature Range: {plant.temperature}</li>
                    )}

                    {plant.tags.length < 1 ? null : 
                        plant.tags.length === 1 && plant.tags[0].includes(",") ?
                            plant.tags[0].split(",").map((tag, idx) => (
                                <li key={idx}>{tag.slice(2)} </li>
                            ))
                            :
                            plant.tags.map((tag, idx) => (
                                <li key={idx}>{tag.slice(2)}</li>
                            ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="plant-show-loading"></div>
        );
    }
}


export default withRouter(PlantShow);
