import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Login = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, isAuthenticated, error } = userLogin;
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
            <h2>Welcome Back.</h2>
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
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
