import React from "react";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/home.css";
import { toggleDisplay } from "../features/reducerSlices/addSpamarSlice";
import NavUtils from "./navUtils";
function NavBar() {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="navBar">
        <ul className="navbar-ul">
          <li id="logo">
            <NavLink to="/home" className={"home"}>
              AG
            </NavLink>
          </li>
          <li>
            <NavLink to="Spamars" id="Spamars">
              Field Side Control
            </NavLink>
          </li>
          <li>
            <NavLink to="RobotControlSystem" id="RobotControlSystem">
              Robot Control System
            </NavLink>
          </li>
          <li>
            <NavLink to="profile" id="Profile">
              Profile
            </NavLink>
          </li>
        </ul>
        <NavUtils />
      </div>
      {/* <Navbar  className='Navbar' expand="lg">
      <Container >
        <Navbar.Brand>Spamar APP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link  as={NavLink} to='Spamars'>Spamars </Nav.Link>
            <Nav.Link as={NavLink} to='profile'>profile</Nav.Link>
            <Nav.Link onClick={()=>{
              dispatch(toggleDisplay());
            }} >add Spamar</Nav.Link>
          </Nav>
      </Container>
    </Navbar> */}

      <Outlet />
    </div>
  );
}

export default NavBar;
