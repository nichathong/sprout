import { connect } from "react-redux";
import Home from './home';

import { logout } from '../../actions/session_actions';

const mapStateToProps = (state) => {
    return {
        loggedIn: state.session.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);