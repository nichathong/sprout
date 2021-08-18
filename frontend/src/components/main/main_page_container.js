import { connect } from "react-redux";
import mainPage from "./main_page";
import { login } from "../../actions/session_actions";

const mstp = state => ({
    errors: state.errors.session,
    formType: "Login",
});

const mdtp = dispatch => ({
    login: user => dispatch(login(user))
});

export default connect(mstp, mdtp)(mainPage);