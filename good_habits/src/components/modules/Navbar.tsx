import React from 'react'
import {CLIENT_ID} from "../../utils/variables";

import Link from "@reach/router";
import GoogleLogin  from 'react-google-login';

const NavLink = props => (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        
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
const NavBar = ({handleLogin, userId, }) => {
  
 // TODO: LOGOUT FOR GOOGLE AUTH API; 
 function logout (){
     
 }
  
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
            <div className="menu-item" onClick={logout}>
              {/* // <a className="NavBar-link" href="#" >Logout</a> */}
            </div>
        </div>
          {/* <div className="NavBar-title-container">
            
          </div> */}
          <div className="logout-button">
          {userId ? (
            null
            ) : (
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={(err) => console.log(err)}
                className="NavBar-link NavBar-login"
              />
            )}
  
          </div>
          
        </div>
        </>
      );
  }
  
  export default NavBar;

