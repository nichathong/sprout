import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchAllPlants } from "../../actions/plant_actions";

import Navbar from './navbar';

const mstp = state => ({
    loggedIn: state.session.isAuthenticated,
    selected: window.location.hash.includes("plants") ?
                "plants" : 
                window.location.hash.includes("instructions") ?
                    "instructions" :
                    window.location.hash.includes("feed") ?
                        "gardens" :
                        window.location.hash.includes("home") ?
                            "home" :
                            null    
});

const mdtp = dispatch => ({
    fetchAllPlants: () => dispatch(fetchAllPlants()),
    logout: () => dispatch(logout())
});

export default connect(mstp, mdtp)(Navbar);