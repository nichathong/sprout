import React from 'react';
// import { Link } from 'react-router-dom'
import NavbarContainer from '../nav/navbar_container';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    render(){
        if (this.props.loggedIn) {
            return (
                <div>
                    <div className="navbar-container">
                        <NavbarContainer/>
                    </div>
                    <h1>Hello</h1>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            )

        }
    }
}

export default Home;

