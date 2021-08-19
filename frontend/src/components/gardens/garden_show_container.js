import { connect } from "react-redux";
import GardenShow from './garden_show';
import { getUserPlants, getUserGardenPlants } from "../../helpers/selectors";

const mstp = (state, ownProps) => ({
    currentUser: state.session.user,
    plants: getUserPlants(state, ownProps.user._id),
    gardenPlants: getUserGardenPlants(state, ownProps.user._id)
});

const mdtp = dispatch => ({
   // action to fetch current user's garden plants
});

export default connect(mstp, mdtp)(GardenShow);