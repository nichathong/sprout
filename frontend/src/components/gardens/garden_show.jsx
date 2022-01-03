import React from "react";
import "./garden_index.css";
import { Link } from 'react-router-dom';


class GardenShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    renderPlantDetail(gardenPlant) {
        const { plants } = this.props
        for (let i = 0; i < plants.length; i++) {
            if (plants[i]._id === gardenPlant.plant) {
                return (
                    <Link to={`/plants/${gardenPlant.plant}`}><img className="garden-plant-image" src={plants[i].photoUrls[0]} /></Link>
                )
            }
        }
    }


    render() {
        const { user, plants, gardenPlants } = this.props;

        var today = new Date();
        var days = 0;

        return (
            gardenPlants.length > 0 ?
                <li className="user-garden-container">
                    <div className="user-garden-top-border"></div>

                    <h3 className="user-garden-header">{user.firstname}'s Garden</h3>

                    <div className="user-garden-dirt">
                        {gardenPlants.map((gardenPlant, idx) => (
                            <li className="individual-sprout-2" key={idx}>
                                <div className="plantName3"> {gardenPlant.nickname} </div>
                                Days alive: {(days = Math.round(Math.ceil(new Date() - new Date(gardenPlant.date.split("T")[0])) / (1000 * 60 * 60 * 24)))} <br />
                                {days < 3 ? <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-10.png" /> : (days < 6 ? <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-20.png" /> : (days < 9 ? <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-3.png" /> : (days < 12 ? <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-4.png" /> : <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-5.png" />)))}
                                <br />
                                {this.renderPlantDetail(gardenPlant)}
                            </li>
                        ))}
                    </div>
                </li>
                : null
        );
    }
}


export default GardenShow;