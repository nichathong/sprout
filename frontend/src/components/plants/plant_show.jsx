import React from "react";
import { Link } from "react-router-dom";


class PlantShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { plant } = this.props;
        
        return (
            <div className="plant-show-container">
                All the plant info goes here
                {plant.name}

                <Link to="/plants">Back to List</Link>
            </div>
        );
    }
}


export default PlantShow;
