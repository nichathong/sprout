import React from "react";
import GardenShowContainer from "./garden_show_container";
import NavBarContainer from "../nav/navbar_container";


class GardenIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        this.props.fetchAllUserGardens();
        this.props.fetchAllPlants();
    }


    render() {
        const { users } = this.props;

        return (
            <div className="garden-index-container">

                <NavBarContainer />

                <h1>Gardens :)</h1>

                <ul>
                    {users.map((user, idx) => 
                        <GardenShowContainer key={idx} user={user}/>
                    )}
                </ul>
                
            </div>
        );
    }
}


export default GardenIndex;