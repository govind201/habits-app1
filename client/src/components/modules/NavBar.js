import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";


// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "707474204069-ibaig6vr8u2gf995465eel35t6kf6u1r.apps.googleusercontent.com";
const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      
      return {
        style: {
         //"font-weight": isCurrent ? 900 : "inherit",
         textShadow: isCurrent ? "0 0 3px white" : "none",
        }
      };
    }}
  />
);
/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }


  logout() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const contextThis = this;
    auth2.signOut().then(function () {
      auth2.disconnect();
      contextThis.props.handleLogout()
    });
  }

  render() {
    return (
      <>
      <div className="NavBar-container">
      <div className="NavBar-sidebar">
        <div className="NavBar-title">
              <Link className="title-link" to="/">Habit Aquarium</Link>
          </div>
          <div className="menu-item">
          <NavLink to="/" className="NavBar-link" data-tut="navbaraquarium">
            Aquarium
          </NavLink>
          </div>
          <div className="menu-item">
          <NavLink to="/habits" className="NavBar-link" data-tut="navbarhabits">
            Habits
          </NavLink>
          </div>
          
          <div className="menu-item">
          <NavLink to="/store" className="NavBar-link" data-tut="navbarstore">
            Store
          </NavLink>
          </div>
          <div className="menu-item">
          <NavLink to="/inventory" className="NavBar-link" data-tut="navbarinventory">
            Inventory
          </NavLink>
          </div>
          <div className="menu-item" onClick={this.logout}>
            <a className="NavBar-link" href="#" >Logout</a>
          </div>
      </div>
        {/* <div className="NavBar-title-container">
          
        </div> */}
        <div className="logout-button">
        {this.props.userId ? (
          null
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}

        </div>
        
      </div>
      </>
    );
  }
}

export default NavBar;