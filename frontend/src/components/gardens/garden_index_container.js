import { connect } from "react-redux";
import GardenIndex from './garden_index';
import { fetchAllUserGardens, fetchAllGardenPlants } from "../../actions/garden_actions";
import { fetchAllPlants } from "../../actions/plant_actions";

const mstp = state => ({
    currentUser: state.session.user,
    users: Object.values(state.entities.users)
});

const mdtp = dispatch => ({
    fetchAllUserGardens: () => dispatch(fetchAllUserGardens()),
    fetchAllPlants: () => dispatch(fetchAllPlants()),
    fetchAllGardenPlants: () => dispatch(fetchAllGardenPlants())
});

export default connect(mstp, mdtp)(GardenIndex);