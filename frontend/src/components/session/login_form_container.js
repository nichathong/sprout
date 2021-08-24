import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login, clearErrors } from "../../actions/session_actions";

const mstp = state => ({
    errors: state.errors.session,
    formType: "Login"
});

const mdtp = dispatch => ({
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mstp, mdtp)(SessionForm);