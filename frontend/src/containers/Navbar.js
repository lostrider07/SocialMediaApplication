import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../images/warbler-logo.png";
import { useHistory } from "react-router-dom";
import { logout } from "../store/actions/userAction";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { isAuthenticated } = userLogin;
  const signoff = () => {
    dispatch(logout);
  };
  const newMessage = () => {
    history.push("/addMessage");
  };
  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Warbler-Home" />
          </Link>
        </div>
        {isAuthenticated ? (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/" onClick={signoff}>Logout</Link>
            </li>
            <li>
              <Link onClick={newMessage}>New Message</Link>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
