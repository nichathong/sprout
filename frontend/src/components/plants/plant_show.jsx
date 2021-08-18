import React from "react";
import { Link } from "react-router-dom";
import NavbarContainer from "../nav/navbar_container";

class PlantShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,

            name: props.plant.name,
            level: props.plant.level,
            waterLevel: props.plant.waterLevel,
            waterFrequency: props.plant.waterFrequency,
            light: props.plant.light,
            temperatureMin: undefined,
            temperatureMax: undefined,
            photoUrls: [],

            tags: {
                isIndoor: props.plant.tags.includes("isIndoor") ? true : false,
                isOutdoor: props.plant.tags.includes("isOutdoor") ? true : false,
                isSucculent: props.plant.tags.includes("isSucculent") ? true : false,
                isFlowering: props.plant.tags.includes("isFlowering") ? true : false,
                isPoisonous: props.plant.tags.includes("isPoisonous") ? true : false,
                isExotic: props.plant.tags.includes("isExotic") ? true : false,
                isMultiColored: props.plant.tags.includes("isMultiColored") ? true : false,
                isHanging: props.plant.tags.includes("isHanging") ? true : false
            }
        };
    }

    render() {
        const { plant } = this.props;
        
        const editForm = (
            <div className="plant-show-edit-form">
                <div className="edit-form-close">x</div>

                <form>
                    
                </form>
            </div>
        );

        return (
            <div className="plant-show-container">
          
                Plant image here
                <h1>{plant.name}</h1>

                <ul>
                    <li>Difficulty: {plant.level.charAt(0).toUpperCase() + plant.level.slice(1)}</li>
                    <li>Watering Frequency: {plant.waterLevel}</li>
                    <li>Hours Between Watering: {plant.waterFrequency * 24}</li>
                    <li>Amount of Sunlight: {plant.light}</li>
                    {plant.temperature === "" ? null : <li>Ideal Temperature Range: {plant.temperature}</li>}
                </ul>

                <Link to="/plants">Back to List</Link>
            </div>
        );
    }
}


export default PlantShow;
