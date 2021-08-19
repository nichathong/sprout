import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import NavbarContainer from "../nav/navbar_container";
import './plant_show.css'

class PlantShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,

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
    }

    
    componentDidMount() {
        this.props.fetchAllPlants();
    }


    _resetForm() {
        this.setState({
            showForm: false,

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
                isIndoor: this.props.plant.tags.includes("isIndoor") ? true : false,
                isOutdoor: this.props.plant.tags.includes("isOutdoor") ? true : false,
                isSucculent: this.props.plant.tags.includes("isSucculent") ? true : false,
                isFlowering: this.props.plant.tags.includes("isFlowering") ? true : false,
                isPoisonous: this.props.plant.tags.includes("isPoisonous") ? true : false,
                isExotic: this.props.plant.tags.includes("isExotic") ? true : false,
                isMultiColored: this.props.plant.tags.includes("isMultiColored") ? true : false,
                isHanging: this.props.plant.tags.includes("isHanging") ? true : false
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
        }).then(() => (this._resetForm()));
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
            <div className="plant-show-edit-form-container">
                <div className="edit-form-close" onClick={this.handleClose}>x</div>

                <form className="edit-plant-form" onSubmit={this.handleSubmit}>

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

                    <label className="sunlight2">Amount of Sunlight
                        <input type="radio" name="light" value={1} onChange={this.update("light")} defaultChecked={1 === plant.light} />{1}
                        <input type="radio" name="light" value={2} onChange={this.update("light")} defaultChecked={2 === plant.light} />{2}
                        <input type="radio" name="light" value={3} onChange={this.update("light")} defaultChecked={3 === plant.light} />{3}
                        <input type="radio" name="light" value={4} onChange={this.update("light")} defaultChecked={4 === plant.light} />{4}
                        <input type="radio" name="light" value={5} onChange={this.update("light")} defaultChecked={5 === plant.light} />{5}
                    </label>

                    <label className="temperature2">Ideal Temperature Range
                        <input  className="temperature-input2" type="numbers" min="0" max="300" value={this.state.temperatureMin} onChange={this.update("temperatureMin")} />
                        -
                        <input className="temperature-input2" type="numbers" min="0" max="300" value={this.state.temperatureMax} onChange={this.update("temperatureMax")} />
                    </label>

                    <label className = "tags2"> Tags: 
                        <input type="checkbox" name="tags" onChange={this.update("isIndoor")} defaultChecked={plant.tags.includes("isIndoor")} />Indoor
                        <input type="checkbox" name="tags" onChange={this.update("isOutdoor")} defaultChecked={plant.tags.includes("isOutdoor")} />Outdoor
                        <input type="checkbox" name="tags" onChange={this.update("isSucculent")} defaultChecked={plant.tags.includes("isSucculent")} />Succulent
                        <input type="checkbox" name="tags" onChange={this.update("isFlowering")} defaultChecked={plant.tags.includes("isFlowering")} />Flowering
                        <input type="checkbox" name="tags" onChange={this.update("isPoisonous")} defaultChecked={plant.tags.includes("isPoisonous")} />Poisonous
                        <input type="checkbox" name="tags" onChange={this.update("isExotic")} defaultChecked={plant.tags.includes("isExotic")} />Exotic
                        <input type="checkbox" name="tags" onChange={this.update("isMultiColored")} defaultChecked={plant.tags.includes("isMultiColored")} />Multi-colored
                        <input type="checkbox" name="tags" onChange={this.update("isHanging")} defaultChecked={plant.tags.includes("isHanging")} />Hanging
                    </label>


                    <input className = "submit-create-plant2" type="submit" value="Update Plant" />
                </form>
            </div> : null;

        return (
            plant ? 
                <div className="plant-show-container">
                    {this.state.showForm ? editForm : null}

                    <div className="navbar-contianer">
                        <NavbarContainer />
                    </div>
            
                    
                    <img className = "plant-image" src={plant.photoUrls[0]} />
                    <div className="information">
                    <h1 className = "plant-name">{plant.name}</h1>
                    

                    <ul className = "plant-info">
                        <li>Difficulty: {plant.level.charAt(0).toUpperCase() + plant.level.slice(1)}</li>
                        <li>Watering Frequency: {plant.waterLevel}</li>
                        <li>Hours Between Watering: {plant.waterFrequency * 24}</li>
                        <li>Amount of Sunlight: {plant.light}</li>
                        {plant.temperature === "0-0" ? null : <li>Ideal Temperature Range: {plant.temperature}</li>}
                    </ul>
                    
                    {plant.tags.length < 1 ? null : 
                        <div className = "plant-tags"> Tags: 
                            {plant.tags.map((tag, idx) => <div key={idx}>{tag.slice(2)} </div>)}
                        </div>
                    }

                    {currentUser.id === plant.author ? 
                        <div className="plant-show-edit-buttons-container">
                            <button className="plant-show-edit-button" onClick={this.handleOpen}>Edit</button>
                            <button className="plant-show-delete-button" onClick={this.handleDelete}>Delete</button>
                        </div> :
                        null
                    }
                    <br/>
                    <Link className = "back-to-list" to="/plants">Back to List</Link>
                    </div>
                </div> : <div className="plant-show-loading"></div>
        );
    }
}


export default withRouter(PlantShow);
