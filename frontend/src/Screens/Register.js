import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/userActions";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Register = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, isAuthenticated } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { error } = userRegister;
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, profileImage));
  };
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);
  return (
    <div>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <div className="row justify-content-md-center text-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h2>Join Warbler Today</h2>

            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <label htmlFor="profileImage">Profile Image URL:</label>
            <input
              className="form-control"
              type="text"
              id="profileImage"
              name="profileImage"
              value={profileImage}
              onChange={(e) => {
                setProfileImage(e.target.value);
              }}
            />
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <button className="btn btn-primary">Sign me up!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
