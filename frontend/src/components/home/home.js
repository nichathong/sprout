import React from 'react';
import NavbarContainer from '../nav/navbar_container';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }


    componentDidMount() {
        this.props.fetchCurrentUserGardenPlants();
    }
    

    render() {
        const { plants, gardenPlants } = this.props;

        return (
            <div>
                <div className="navbar-container">
                    <NavbarContainer/>
                </div>

                <h1>Hello garden graphics go here</h1>

                <ul>
                    {plants.map((plant, idx) => {
                        return <li key={idx}>{plant.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}


export default Home;

