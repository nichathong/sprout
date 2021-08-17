import React from 'react';
// import { Link } from 'react-router-dom'

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
                    <h1>Hello</h1>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            )

        }
    }
}

export default Home;

