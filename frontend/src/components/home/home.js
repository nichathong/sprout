import React from 'react';
import NavbarContainer from '../nav/navbar_container';
import './home.css'


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }


    componentDidMount() {
        this.props.fetchCurrentUserGardenPlants();

        
    }

    handleClick(plantId) {
        this.props.deleteGardenPlant(plantId);
        console.log(this.props.gardenPlants);
    }
    

    render() {
        const { plants, gardenPlants } = this.props;
        var today = new Date();

        return (
            <div>
                <div className="navbar-container">
                    <NavbarContainer/>
                </div>
                <div className = "home-page-container">
                <h1 className="hello">Welcome to your garden!</h1>
                <img className = "dirt" src="dirt.jpeg"/>
                

                <ul className = "plantList">
                    {gardenPlants.map((plant, idx) => {
                        return <li className = "individual-sprout" key={idx}>
                            <img src="plant-1.png"/>
                            <button onClick={() => {this.handleClick(plant._id)}}>Delete</button>
                            {console.log(Math.ceil(new Date() - new Date(plant.date.split("T")[0])) / (1000 * 60 * 60 * 24))}
                           
                            </li>
                    })}
                </ul>
                </div>
            </div>
        )
    }
}


export default Home;

