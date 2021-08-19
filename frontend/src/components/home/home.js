import React from 'react';
import NavbarContainer from '../nav/navbar_container';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }


    componentDidMount() {
        this.props.fetchCurrentUserGarden(this.props.currentUser);
        console.log(this.props.plants)
    }
    

    render() {
        return (
            <div>
                <div className="navbar-container">
                    <NavbarContainer/>
                </div>

                <h1>Hello garden graphics go here</h1>
            </div>
        )
    }
}


export default Home;

