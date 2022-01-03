import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, clearErrors } from '../../actions/session_actions';

const mstp = state => ({
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    formType: "Sign Up"
})

const mdtp = dispatch => ({
    signup: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
})
export default connect(mstp, mdtp)(SessionForm);