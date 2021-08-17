import { connect } from "react-redux";
import PlantShow from "./plant_show";
import { updatePlant, deletePlant } from "../../actions/plant_actions";

const mstp = (state, ownProps) => ({
    currentUser: state.session.user,
    plant: state.entities.plants[ownProps.match.params.plantId]
});

const mdtp = dispatch => ({
    updatePlant: plant => dispatch(updatePlant(plant)),
    deletePlant: plantId => dispatch(deletePlant(plantId))
});

export default connect(mstp, mdtp)(PlantShow);