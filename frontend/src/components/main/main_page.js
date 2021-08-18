import React from 'react';
import "./main_page.css"

class MainPage extends React.Component {

  render() {
    return (
      <div className = "main">
        <img className = "logo" src="sprout2.png"></img>
        <h1 className = "welcome">Welcome to Sprout</h1>
        <h2 className = "homepage">This is going to be a homepage</h2>
        <footer>
          Copyright &copy; 2021 Sprout team
        </footer>
      </div>
    );
  }
}

export default MainPage;