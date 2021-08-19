import React from "react";
import "./garden_index.css";


class GardenShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const { user, plants, gardenPlants } = this.props;

        // console.log(`${user.firstname} ------- ${gardenPlants.length}`);

        return (
            gardenPlants.length > 0 ?
                <li className="user-garden-container">
                    <div className="user-garden-top-border"></div>

                    <h3 className="user-garden-header">{user.firstname}'s Garden</h3>

                    <img className="user-garden-dirt" src="dirt.jpeg" />
                </li>
                : null
        );
    }
}


export default GardenShow;