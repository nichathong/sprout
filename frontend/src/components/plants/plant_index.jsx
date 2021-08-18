import React from "react";
import { Link } from "react-router-dom";


class PlantIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            
            name: "",
            level: "Intermediate",
            waterLevel: 1,
            waterFrequency: 4,
            light: 1,
            temperatureMin: undefined,
            temperatureMax: undefined,
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
    }


    componentDidMount() {
        this.props.fetchAllPlants();
    }


    _resetForm() {
        this.setState({
            showForm: false,

            name: "",
            level: "Intermediate",
            waterLevel: 1,
            waterFrequency: 4,
            light: 1,
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

        let tags = this.state.tags;
        let selectedTags = [];
        for (let i in tags) {
            if (tags[i]) selectedTags.push(i);
        }

        console.log(this.state)
        this.props.createPlant({
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


    render() {
        const { plants } = this.props;

        const plantForm = (
            <form className="create-plant-form" onSubmit={this.handleSubmit}>
                <div className="create-plant-form-close" onClick={this.handleClose}>x</div>

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
                    <input type="radio" name="watering-frequency" value={1} onChange={this.update("waterLevel")} defaultChecked/>{1}
                    <input type="radio" name="watering-frequency" value={2} onChange={this.update("waterLevel")} />{2}
                    <input type="radio" name="watering-frequency" value={3} onChange={this.update("waterLevel")} />{3}
                    <input type="radio" name="watering-frequency" value={4} onChange={this.update("waterLevel")} />{4}
                    <input type="radio" name="watering-frequency" value={5} onChange={this.update("waterLevel")} />{5}
                </label>

                <label>How often should the plant be watered (in days)?
                    <input type="numbers" min="0" max="1000" value={this.state.waterFrequency} onChange={this.update("waterFrequency")} />
                </label>

                <label>Amount of Sunlight
                    <input type="radio" name="sunlight" value={1} onChange={this.update("sunlight")} defaultChecked/>{1}
                    <input type="radio" name="sunlight" value={2} onChange={this.update("sunlight")} />{2}
                    <input type="radio" name="sunlight" value={3} onChange={this.update("sunlight")} />{3}
                    <input type="radio" name="sunlight" value={4} onChange={this.update("sunlight")} />{4}
                    <input type="radio" name="sunlight" value={5} onChange={this.update("sunlight")} />{5}
                </label>

                <label>Ideal Temperature Range
                    <input type="numbers" min="0" max="300" value={this.state.temperatureMin} onChange={this.update("temperatureMin")}/>
                    -
                    <input type="numbers" min="0" max="300" value={this.state.temperatureMax} onChange={this.update("temperatureMax")}/>
                </label>

                <label>Tags
                    <input type="checkbox" name="tags" onChange={this.update("isIndoor")} />Indoor
                    <input type="checkbox" name="tags" onChange={this.update("isOutdoor")} />Outdoor
                    <input type="checkbox" name="tags" onChange={this.update("isSucculent")} />Succulent
                    <input type="checkbox" name="tags" onChange={this.update("isFlowering")} />Flowering
                    <input type="checkbox" name="tags" onChange={this.update("isPoisonous")} />Poisonous
                    <input type="checkbox" name="tags" onChange={this.update("isExotic")} />Exotic
                    <input type="checkbox" name="tags" onChange={this.update("isMultiColored")} />Multi-colored
                    <input type="checkbox" name="tags" onChange={this.update("isHanging")} />Hanging
                </label>

                <input type="submit" value="Create Plant"/>
            </form>
        );

        return(
            <div className="plant-index-container">

                {this.state.showForm ? plantForm : null}

                <h1 className="plant-index-header">Plants</h1>
                <button className="create-plant-button" onClick={() => this.setState({ showForm: true })}>+</button>

                <ul className="plant-index-list">
                    {plants.map(plant => 
                        <Link key={plant._id} to={`/plants/${plant._id}`}>
                            <li className="plant-index-item" key={plant._id}>
                                Image here
                                {plant.name}
                                <button>Add</button>
                            </li>
                        </Link>
                    )}
                </ul>

            </div>
        );
    }
}


export default PlantIndex;