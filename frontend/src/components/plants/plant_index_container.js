import { connect } from "react-redux";
import PlantIndex from "./plant_index";
import { fetchAllPlants, createPlant } from "../../actions/plant_actions";

const mstp = state => ({
    currentUser: state.session.user,
    plants: Object.values(state.entities.plants)
});

const mdtp = dispatch => ({
    fetchAllPlants: () => dispatch(fetchAllPlants()),
    createPlant: plant => dispatch(createPlant(plant))
});

export default connect(mstp, mdtp)(PlantIndex);