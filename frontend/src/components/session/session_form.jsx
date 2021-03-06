import React from "react";
import { Link } from "react-router-dom";
import './session_form.css'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoHandler = this.demoHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/home");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
        errors: { ...this.state.errors, [field]: "" },
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === "Login") {
      this.props.login({
        email: this.state.email,
        password: this.state.password,
      });
    } else {
      this.props.signup({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  demoHandler(e) {
    e.preventDefault();
    this.props.login({
      email: "demo1@gmail.com",
      password: "123456",
    });
  }

  // renderErrors() {
  //   return (
  //     <ul className="error-class">
  //       {Object.keys(this.props.errors).map((error, i) => (
  //         <li className="error-msg" key={`error-${i}`}>{this.state.errors[error]}</li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    const { formType } = this.props;
    const { firstname, lastname, password, password2, email } =
      this.props.errors;
    return (
      <div className="main-session-form">
        {/* <div className="background-container">
          <img
            className="background-img"
            src="vadim-kaipov-8ZELrodSvTc-unsplash.jpg"
            alt=""
          ></img>
        </div> */}
        <div className="session-form-continer">
          <div className="logo-container-session">
            <img className="logo-session" src="sprout2.png" alt=""></img>
          </div>
          <form className="session-form" onSubmit={this.handleSubmit}>
            {formType === "Login" ? null : (
              <div className="login-form">
                <label>
                  <input
                    id="firstname"
                    className={`input-box${firstname ? "-err" : ""}`}
                    type="text"
                    value={this.state.firstname}
                    placeholder="First Name"
                    onChange={this.update("firstname")}
                  />
                  {firstname && (
                      <div className="session-error-anchor">
                        <div className="error-msg">
                            {this.state.errors.firstname}
                        </div>
                      </div>
                  )}
                </label>

                <label>
                  <input
                    className={`input-box${lastname ? "-err" : ""}`}
                    type="text"
                    value={this.state.lastname}
                    placeholder="Last Name"
                    onChange={this.update("lastname")}
                  />
                  {lastname && (
                      <div className="session-error-anchor">
                        <div className="error-msg">
                            {this.state.errors.lastname}
                        </div>
                      </div>
                  )}
                </label>
              </div>
            )}

            <label>
              <input
                className={`input-box${email ? "-err" : ""}`}   
                type="email"
                value={this.state.email}
                placeholder="Email"
                onChange={this.update("email")}
              />
              {email && (
                  <div className="session-error-anchor">
                      <div className="error-msg">
                          {this.state.errors.email}
                        </div>
                  </div>
              )}
            </label>

            <label>
              <input
                className={`input-box${password ? "-err" : ""}`}
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.update("password")}
              />
              {password && (
                  <div className="session-error-anchor">
                      <div className="error-msg">{this.state.errors.password}</div>
                  </div>
              )}
            </label>

            {formType === "Login" ? null : (
              <label>
                <input
                className={`input-box${password2 ? "-err" : ""}`}   
                  type="password"
                  value={this.state.password2}
                  placeholder="Re-enter Password"
                  onChange={this.update("password2")}
                />
                {password2 && (
                    <div className="session-error-anchor">
                        <div className="error-msg">{this.state.errors.password2}</div>
                    </div>
                )}
              </label>
            )}
            <input
              className="session-form-submit"
              type="submit"
              value="Submit"
            />
            <br />
            {formType === "Login" ? (
              <button className="demo-button" onClick={this.demoHandler}>
                Demo User
              </button>
            ) : null}
          </form>
          <div className="bottom-text">
            {formType === "Login" ? (
              <div className="need-an-account">
                Need an account? <Link to="/signup">Register</Link>
              </div>
            ) : (
              <div className="already-have-account">
                <Link to="/login">Already have an account?</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SessionForm;