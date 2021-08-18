import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }
    logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }
    render() {
        return (
            <div>this is a navbar</div>
        );
    }

}

export default Navbar;