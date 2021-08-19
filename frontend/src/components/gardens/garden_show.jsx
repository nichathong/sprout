import React from "react";

class GardenShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        // call action to get this user's garden plants
    }


    render() {
        const { user, plants, gardenPlants } = this.props;

        return (
            <li>
                <h3>{user.firstname}'s Garden</h3>
            </li>
        );
    }
}

export default GardenShow;