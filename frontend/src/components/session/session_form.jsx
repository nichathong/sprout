import React from "react";
import { Link } from "react-router-dom";


class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        // register
    }

    render() {
        const { formType } = this.props;

        return (
            <div className="session-form-container">
                <form className="session-form" onSubmit={this.handleSubmit}>

                    {formType === "Login" ? null :
                        <div>
                            <label>Firstname
                                <input type="text" value={this.state.firstname} placeholder="First Name" onChange={this.update("firstname")} />
                            </label>

                            <label>Lastname
                                <input type="text" value={this.state.lastname} placeholder="Last Name" onChange={this.update("lastname")} />
                            </label>
                        </div>
                    }

                    <label>Email
                        <input type="email" value={this.state.email} placeholder="Email" onChange={this.update("email")} />
                    </label>

                    <label>Password
                        <input type="password" value={this.state.password} placeholder="Password" onChange={this.update("password")} />
                    </label>

                    {formType === "Login" ? null :
                        <label>Re-enter Password
                            <input type="password" value={this.state.password2} placeholder="Re-enter Password" onChange={this.update("password2")} />
                        </label>
                    }

                    <input type="submit" value="Submit" />
                </form>

                {formType === "Login" ?
                    <h3>Need an account? <Link to="/signup">Register</Link></h3> :
                    <h3><Link to="/login">Already have an account?</Link></h3>
                }

            </div>
        );
    }
}

export default SessionForm;