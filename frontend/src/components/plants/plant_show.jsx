import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import NavbarContainer from "../nav/navbar_container";


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
        this.handleSelectedFile = this.handleSelectedFile.bind(this)
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
            photoUrls: [],
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
            if (field === "waterLevel" || field === "sunlight") {
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
        const formData = new FormData();
        formData.append("id",this.props.plant._id)
        formData.append("author", this.props.currentUser.id);
        formData.append("name",this.state.name);
        formData.append("level",this.state.level);
        formData.append("waterLevel", this.state.waterLevel);
        formData.append("waterFrequency",this.state.waterFrequency);
        formData.append("light",this.state.light);
        formData.append("temperature",`${this.state.temperatureMin}-${this.state.temperatureMax}`);
        formData.append("photoUrls",this.state.photoUrls);
        formData.append("file",this.state.file)

        let tags = this.state.tags;
        let selectedTags = [];
        for (let i in tags) {
            if (tags[i]) selectedTags.push(i);
        }

        formData.append("tags", selectedTags)
        this.props.updatePlant(formData).then(() => (this._resetForm()));
        this.stateChange()
        // let tags = this.state.tags;
        // let selectedTags = [];
        // for (let i in tags) {
        //     if (tags[i]) selectedTags.push(i);
        // }

        // this.props.updatePlant({
        //     id: this.props.plant._id,
        //     name: this.state.name,
        //     level: this.state.level,
        //     waterLevel: this.state.waterLevel,
        //     waterFrequency: this.state.waterFrequency,
        //     light: this.state.light,
        //     temperature: `${this.state.temperatureMin}-${this.state.temperatureMax}`,
        //     photoUrls: this.state.photoUrls,
        //     tags: selectedTags
        // }).then(() => (this._resetForm()));
    }

    stateChange() {
        setTimeout(function () {
            window.location.reload() 
        }, 1200);
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

    handleSelectedFile(e){
        e.preventDefault();
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ file: file, url: fileReader.result });
        };
        if (file) {
        fileReader.readAsDataURL(file);
        }
    }


    render() {
        const { plant, currentUser } = this.props;
        const preview = this.state.url ? <img src={this.state.url} /> : null;
        const editForm = plant ?
            <div className="plant-show-edit-form-container">
                <div className="edit-form-close" onClick={this.handleClose}>x</div>

                <form className="edit-plant-form" onSubmit={this.handleSubmit}>

                    <label>Name
                        <input type="text" value={this.state.name} onChange={this.update("name")} />
                    </label>

                    <label>Difficulty
                        <select onChange={this.update("level")} value={this.state.level}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </label>

                    <label>Watering Frequency
                        <input type="radio" name="watering-frequency" value={1} onChange={this.update("waterLevel")} checked={1 === plant.waterLevel} />{1}
                        <input type="radio" name="watering-frequency" value={2} onChange={this.update("waterLevel")} checked={2 === plant.waterLevel} />{2}
                        <input type="radio" name="watering-frequency" value={3} onChange={this.update("waterLevel")} checked={3 === plant.waterLevel} />{3}
                        <input type="radio" name="watering-frequency" value={4} onChange={this.update("waterLevel")} checked={4 === plant.waterLevel} />{4}
                        <input type="radio" name="watering-frequency" value={5} onChange={this.update("waterLevel")} checked={5 === plant.waterLevel} />{5}
                    </label>

                    <label>How often should the plant be watered (in days)?
                        <input type="numbers" min="0" max="1000" value={this.state.waterFrequency} onChange={this.update("waterFrequency")} />
                    </label>

                    <label>Amount of Sunlight
                        <input type="radio" name="sunlight" value={1} onChange={this.update("sunlight")} checked={1 === plant.light} />{1}
                        <input type="radio" name="sunlight" value={2} onChange={this.update("sunlight")} checked={2 === plant.light} />{2}
                        <input type="radio" name="sunlight" value={3} onChange={this.update("sunlight")} checked={3 === plant.light} />{3}
                        <input type="radio" name="sunlight" value={4} onChange={this.update("sunlight")} checked={4 === plant.light} />{4}
                        <input type="radio" name="sunlight" value={5} onChange={this.update("sunlight")} checked={5 === plant.light} />{5}
                    </label>

                    <label>Ideal Temperature Range
                        <input type="numbers" min="0" max="300" value={this.state.temperatureMin} onChange={this.update("temperatureMin")} />
                        -
                        <input type="numbers" min="0" max="300" value={this.state.temperatureMax} onChange={this.update("temperatureMax")} />
                    </label>

                    <label>Tags
                        <input type="checkbox" name="tags" onChange={this.update("isIndoor")} checked={plant.tags.includes("isIndoor")} />Indoor
                        <input type="checkbox" name="tags" onChange={this.update("isOutdoor")} checked={plant.tags.includes("isOutdoor")} />Outdoor
                        <input type="checkbox" name="tags" onChange={this.update("isSucculent")} checked={plant.tags.includes("isSucculent")} />Succulent
                        <input type="checkbox" name="tags" onChange={this.update("isFlowering")} checked={plant.tags.includes("isFlowering")} />Flowering
                        <input type="checkbox" name="tags" onChange={this.update("isPoisonous")} checked={plant.tags.includes("isPoisonous")} />Poisonous
                        <input type="checkbox" name="tags" onChange={this.update("isExotic")} checked={plant.tags.includes("isExotic")} />Exotic
                        <input type="checkbox" name="tags" onChange={this.update("isMultiColored")} checked={plant.tags.includes("isMultiColored")} />Multi-colored
                        <input type="checkbox" name="tags" onChange={this.update("isHanging")} checked={plant.tags.includes("isHanging")} />Hanging
                    </label>

                    {preview}
                    <input type="file" onChange={this.handleSelectedFile}/>

                    <input type="submit" value="Update Plant" />
                </form>
            </div> : null;

        return (
            plant ? 
                <div className="plant-show-container">
                    {this.state.showForm ? editForm : null}

                    <div className="navbar-contianer">
                        <NavbarContainer />
                    </div>
            
                    Plant image here
                    <img src={plant.photoUrls[0]} />
                    <h1>{plant.name}</h1>

                    <ul>
                        <li>Difficulty: {plant.level.charAt(0).toUpperCase() + plant.level.slice(1)}</li>
                        <li>Watering Frequency: {plant.waterLevel}</li>
                        <li>Hours Between Watering: {plant.waterFrequency * 24}</li>
                        <li>Amount of Sunlight: {plant.light}</li>
                        {plant.temperature === "0-0" ? null : <li>Ideal Temperature Range: {plant.temperature}</li>}
                    </ul>

                    {plant.tags.length < 1 ? null : 
                        <div>
                            {plant.tags.map((tag, idx) => <div key={idx}>{tag.slice(2)}</div>)}
                        </div>
                    }

                    {currentUser.id === plant.author ? 
                        <div className="plant-show-edit-buttons-container">
                            <button className="plant-show-edit-button" onClick={this.handleOpen}>Edit</button>
                            <button className="plant-show-delete-button" onClick={this.handleDelete}>Delete</button>
                        </div> :
                        null
                    }

                    <Link to="/plants">Back to List</Link>
                </div> : <div></div>
        );
    }
}


export default withRouter(PlantShow);
