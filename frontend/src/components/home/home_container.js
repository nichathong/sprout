import { connect } from "react-redux";
import Home from './home';
import { fetchCurrentUserGardenPlants, deleteGardenPlant, updateGardenPlant, fetchGardenPlant } from "../../actions/garden_actions";
import { getCurrentUserPlants, getCurrentUserGardenPlants } from "../../helpers/selectors";

const mstp = state => ({
    currentUser: state.session.user,
    plants: getCurrentUserPlants(state),
    gardenPlants: getCurrentUserGardenPlants(state)
});

const mdtp = dispatch => ({
    fetchCurrentUserGardenPlants: () => dispatch(fetchCurrentUserGardenPlants()),
    deleteGardenPlant: gardenPlantId => dispatch(deleteGardenPlant(gardenPlantId)),
    updateGardenPlant: gardenPlant => dispatch(updateGardenPlant(gardenPlant)),
    fetchGardenPlant: gardenPlantId => dispatch(fetchGardenPlant(gardenPlantId))
});

export default connect(mstp, mdtp)(Home);