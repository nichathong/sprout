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
        
            </div>

                <div className="created-by">
                    About the team: 

                    <div className="mern-people">
                    <div className="patrick">Patrick Campbell <br />
                        <a href="https://www.linkedin.com/in/patrick-campbell-336a72139/" target="_blank"><img className="social" src="LinkedIn.png" /></a>
                        <a className="social" href="https://github.com/pcampbell42" target="_blank"><img className="social" src="Github.png" /></a><br/>
                            <img className="profile" src="patrick.png" /></div>

                    <div className="shirley">Shirley Tang <br />
                        <a href="https://www.linkedin.com/in/shirley-tang-213a40179/" target="_blank"><img className="social" src="LinkedIn.png" /></a>
                            <a className="social" href="https://github.com/shirleytang0121" target="_blank"><img className="social" src="Github.png" /></a><br />
                            <img className="profile" src="shirley.png" /></div>

                    <div className="nicha">Nicha Thongpanchang <br />
                        <a href="https://www.linkedin.com/in/nicha-thpng/" target="_blank"><img className="social" src="LinkedIn.png" /></a>
                            <a className="social" href="https://github.com/nichathong" target="_blank"><img className="social" src="Github.png" /></a><br />
                            <img className="profile" src="nicha.png" /></div>

                    <div className="annie">Annie Yang <br />
                        <a href="https://www.linkedin.com/in/annie-yang-48780175/" target="_blank"><img className="social" src="LinkedIn.png" /></a>
                            <a className="social" href="https://github.com/annieyang1993?tab=repositories" target="_blank"><img className="social" src="Github.png" /></a><br />
                            <img className="profile" src="annie.png" /></div>
                    </div>
                </div>
                <ol className="instructions2">
                    <h3 className="instructions-title">Instructions: </h3>
                    <li> Add up to 12 plants to your garden! </li>
                    <li>Watering cans will remind you when to water your plants! Simply click on them, and the watering date will automatically update to the next time your plant should be watered. </li>
                    <li>If a plant is not in the index, feel free to add your own with the plus icon!</li>
                    <li>View other people's gardens via the garden index. </li>

                </ol>
            </div>
            
        )
    }
}


export default Instructions;