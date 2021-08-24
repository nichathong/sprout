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
            <h2 className="homepage">Everything you need to start and grow your own garden. </h2>

            <div className = "description">  Name your plants, update their birthdates, and see them grow! </div>
            <ol className = "instructions"> 
            <li>Watering cans will remind you when to water your plants! Simply click on them, and the watering date will automatically update to the next time your plant should be watered. </li>
            <li>If a plant is not in the index, feel free to add your own with the plus icon!</li>
            <li>View other people's gardens via the garden index. </li>
            </ol>

            <div className = "created-by"> 
          
              <div className = "patrick">Patrick Campbell <br/>
                <a href="https://www.linkedin.com/in/patrick-campbell-336a72139/" target="_blank"><img className="social" src="LinkedIn.png" /></a>
                <a className="social" href="https://github.com/pcampbell42" target="_blank"><img className="social" src="Github.png" /></a></div>

                <div className="shirley">Shirley Tang <br />
                <a href="https://www.linkedin.com/in/shirley-tang-213a40179/" target="_blank"><img className="social" src="LinkedIn.png" /></a>
                <a className="social" href="https://github.com/shirleytang0121" target="_blank"><img className="social" src="Github.png" /></a></div>

                <div className="nicha">Nicha Thongpanchang <br />
                <a href="https://www.linkedin.com/in/nicha-thpng/" target="_blank"><img className="social" src="LinkedIn.png" /></a>
                <a className="social" href="https://github.com/nichathong" target="_blank"><img className="social" src="Github.png" /></a></div>

                <div className="annie">Annie Yang <br />
                  <a href="https://www.linkedin.com/in/annie-yang-48780175/" target="_blank"><img className="social" src="LinkedIn.png" /></a>
                <a className="social" href="https://github.com/annieyang1993?tab=repositories" target="_blank"><img className="social" src="Github.png" /></a></div>
            
            
            </div>
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

          </div>
            <div className="login-signup-link">
              <Link className="login-splash" to="/login">Log in</Link>
              <Link className="signup-splash" to="/signup">Sign up</Link>
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