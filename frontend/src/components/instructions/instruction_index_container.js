import React from 'react';
import NavbarContainer from '../nav/navbar_container';
import "./instruction.css"

class Instructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateForm: false,
            showWaterDone: false,
            _id: '',
            owner: '',
            plant: '',
            nickname: '',
            waterDate: '',
            date: '',
        };

        

    }


    render() {
        return(
            <div className = "plant-index-item-mega-container">
            <div className="garden-index-outer-container">
                <NavbarContainer />
        <ol className="instructions2"> 
                        <h3 className="instructions-title">Instructions: </h3>
            <li>Add up to 12 plants to your garden! </li>
              <li>Watering cans will remind you when to water your plants! Simply click on them, and the watering date will automatically update to the next time your plant should be watered. </li>
              <li>If a plant is not in the index, feel free to add your own with the plus icon!</li>
              <li>View other people's gardens via the garden index. </li>
             
            </ol>
            </div>
            </div>
        )
    }
}


export default Instructions;