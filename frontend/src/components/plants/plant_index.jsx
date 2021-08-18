import React from "react";
import { Link } from "react-router-dom";
import NavbarContainer from "../nav/navbar_container";

class PlantIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            plant: {

            }
        };

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    componentDidMount() {
        this.props.fetchAllPlants();
    }


    update(field) {

    }


    handleSubmit(e) {

    }


    handleClose(e) {
        e.preventDefault();
        this.setState({ 
            showForm: false,
            // reset plant inputs in state
         });
    }


    render() {
        const { plants } = this.props;

        const plantForm = (
            <form className="create-plant-form">
                <div className="create-plant-form-close" onClick={this.handleClose}>x</div>

                <label>
                    <input />
                </label>
            </form>
        );

        return(
            <div className="plant-index-container">
                <div className="navbar-contianer">
                    <NavbarContainer/>
                </div>

                {this.state.showForm ? plantForm : null}

                <h1 className="plant-index-header">Plants</h1>
                <button className="create-plant-button" onClick={() => this.setState({ showForm: true })}>+</button>

                <ul className="plant-index-list">
                    {plants.map(plant => 
                        <Link key={plant._id} to={`/plants/${plant._id}`}>
                            <li className="plant-index-item" key={plant._id}>
                                Image here
                                {plant.name}
                                <button>Add</button>
                            </li>
                        </Link>
                    )}
                </ul>

            </div>
        );
    }
}


export default PlantIndex;