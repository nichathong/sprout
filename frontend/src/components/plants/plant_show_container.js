import { connect } from "react-redux";
import PlantShow from "./plant_show";
import { updatePlant, deletePlant, fetchAllPlants } from "../../actions/plant_actions";

const mstp = (state, ownProps) => ({
    currentUser: state.session.user,
    plant: state.entities.plants[ownProps.match.params.plantId],
    errors: state.errors.plants
});

const mdtp = dispatch => ({
    updatePlant: plant => dispatch(updatePlant(plant)),
    deletePlant: plantId => dispatch(deletePlant(plantId)),
    fetchAllPlants: () => dispatch(fetchAllPlants())
});

export default connect(mstp, mdtp)(PlantShow);