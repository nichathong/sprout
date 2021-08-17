import { connect } from 'react-redux';
import SessionForm from './session_form';
// import { signup } from '../../actions/session_actions';

const mstp = state => ({
    // signedIn: state.session.isSignedIn, wtf is this for
    // errors: state.errors.session,
    formType: "Sign Up"
})

const mdtp = dispatch => ({
    // signup: user => dispatch(signup(user))
})
export default connect(mstp, mdtp)(SessionForm);