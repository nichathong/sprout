import React from "react";
import GardenShowContainer from "./garden_show_container";
import NavBarContainer from "../nav/navbar_container";
import "./garden_index.css"


class GardenIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        this.props.fetchAllUserGardens();
        this.props.fetchAllPlants();
        this.props.fetchAllGardenPlants();
    }


    render() {
        const { users } = this.props;

        return (
            <div className="garden-index-outer-container">
                <NavBarContainer />

                <div className="garden-index-container">
                    <h1 className="garden-index-header">Browse Gardens</h1>

                    <ul className="garden-index-list-container">
                        {users.map((user, idx) => 
                            <GardenShowContainer key={idx} user={user}/>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}


export default GardenIndex;