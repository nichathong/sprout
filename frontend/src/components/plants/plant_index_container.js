import { connect } from "react-redux";
import PlantIndex from "./plant_index";
import { fetchAllPlants, createPlant } from "../../actions/plant_actions";
import { addGardenPlant } from "../../actions/garden_actions";
import { clearGardenErrors } from "../../actions/garden_actions";

const mstp = state => ({
    currentUser: state.session.user,
    plants: Object.values(state.entities.plants),
    errors: state.errors.plants,
    addPlantError: state.errors.gardens
});

const mdtp = dispatch => ({
    fetchAllPlants: () => dispatch(fetchAllPlants()),
    createPlant: plant => dispatch(createPlant(plant)),
    addGardenPlant: gardenPlantId => dispatch(addGardenPlant(gardenPlantId)),
    clearGardenErrors: () => dispatch(clearGardenErrors())
});

export default connect(mstp, mdtp)(PlantIndex);