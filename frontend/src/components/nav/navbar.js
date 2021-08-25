import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        };
        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllPlants();
    }

    logoutUser(e) {
      e.preventDefault();
      this.props.logout();
    }

    render() {
        const { selected } = this.state;

        if (this.props.loggedIn) {
            return (
                <div className="nav-container">
                    <nav className="all-nav-bttn">

                        <div className="nav-left">
                            <div className="explore-links">
                                <Link className="explore-plant-link" id={selected === "plants" ? "selected" : null}
                                        to={'/plants'} onClick={() => this.setState({ selected: "plants" })}>All Plants</Link>
                            </div>

                            <div className="explore-garden">
                                <Link className="explore-garden-link" id={selected === "gardens" ? "selected" : null}
                                        to={"/feed"} onClick={() => this.setState({ selected: "gardens" })}>Gardens</Link>
                            </div>
                        </div>

                    
                        <Link className="logo-nave" id={selected === "home" ? "selected" : null} 
                                to={'/home'} onClick={() => this.setState({ selected: "home" })}><img src="sprout2.png" alt=""></img></Link>


                        <div className="nav-right">
                            <div className="instructions">
                                <Link className="explore-instructions" id={selected === "instructions" ? "selected" : null}
                                    to={'/instructions'} onClick={() => this.setState({ selected: "instructions" })}>About</Link>
                            </div>
                            <button className="logout-bttn" onClick={this.logoutUser}>Log out</button>
                        </div>
                    </nav>
                </div>
            );

        }
    }

}

export default Navbar;