import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
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
        if (this.props.loggedIn) {
            return (
                <div className="nav-container">
                    <nav className="all-nav-bttn">
                        <div className = "instructions">
                        <Link className="explore-instructions" to={'/instructions'}>About</Link>
                        </div>
                        <div className="explore-links">
                            <Link className="explore-plant-link"to={'/plants'}>All Plants</Link>
                        </div>
                        <div className="explore-garden">
                            <Link className="explore-garden-link" to={"/feed"}>Gardens</Link>
                        </div>

                    
                        <Link className="logo-nave" to={'/home'}><img src="sprout2.png" alt=""></img></Link>
                        <button className="logout-bttn" onClick={this.logoutUser}>Log out</button>
                    </nav>
                </div>
            );

        }
    }

}

export default Navbar;