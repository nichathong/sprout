import { connect } from "react-redux";
import Home from './home';
import { fetchCurrentUserGarden, deleteGardenPlant } from "../../actions/garden_actions";
import { getCurrentUserPlants } from "../../helpers/selectors";

const mstp = state => ({
    currentUser: state.session.user,
    plants: getCurrentUserPlants(state)
});

const mdtp = dispatch => ({
    fetchCurrentUserGarden: user => dispatch(fetchCurrentUserGarden(user)),
    deleteGardenPlant: gardenPlantId => dispatch(deleteGardenPlant(gardenPlantId))
});

export default connect(mstp, mdtp)(Home);