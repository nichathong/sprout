import React from 'react';
import {Link} from 'react-router-dom';
import "./main_page.css"

class MainPage extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/home"); //or /login?
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.login(user)
  }

  

  render() {
    return (
      <div className="main-page">
        {/* <div className="background-container">
          <img className="background-img" src="vadim-kaipov-8ZELrodSvTc-unsplash.jpg" alt=""></img>
        </div> */}
        <div className="main-container">
          <div className="content-contianer">
            <h1 className="welcome">Welcome to</h1>
          </div>
          <div className="logo-container">
            <img className="logo" src="sprout2.png" alt=""></img>
          </div>
          <div className="content-contianer">
            <h2 className="homepage">Everything you need to start & grow your own garden. </h2>
            {/* <div className="login-form-splash">
              <form onSubmit={this.handleSubmit} className="loging-form-box">
                <label>Log in
                  <input
                  type="email"
                  placeholeder="Email"
                  value={this.state.email}
                  onChange={this.update("email")}
                  />
                </label>
                <label>Password
                  <input
                  type="password"
                  placeholeder="Password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  />
                </label>
                <input
                    className="session-submit"
                    type="submit"
                    value="Log In"
                />


              </form>

            </div> */}
            <div className="login-signup-link">
              <Link className="login-splash" to="/login">Log in</Link>
              <Link className="signup-splash" to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
        {/* <div className="footer-container">
          <footer className="footter">
            Copyright &copy; 2021 Sprout team
          </footer>
        </div> */}
      </div>
    );
  }
}

export default MainPage;