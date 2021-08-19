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
                    <div className="all-nav-bttn">
                        <Link className="explore-plant-link"to={'/plants'}>Explore plants</Link>
                        <Link className="logo-nave" to={'/home'}><img src="sprout2.png" alt=""></img></Link>
                        <button className="logout-bttn" onClick={this.logoutUser}>Log out</button>
                    </div>
                </div>
            );

        }
    }

}

export default Navbar;