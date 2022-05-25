import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {login} from "../store/actions/userAction";
import {useHistory} from 'react-router-dom'
import Loader from './Loader';
import Message from './Message';
const AuthForm = (props) => {
    const {heading,buttonText}=props;
   
    const userLogin=useSelector(state=>state.userLogin);
    const {loading,isAuthenticated,error}=userLogin;
    const history=useHistory();
    const dispatch=useDispatch();
    const [email,setEmail]=useState("");
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [profileImage,setProfileImage]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(email,password));
    }
    useEffect(()=>{
        if(isAuthenticated){
            history.push("/dashboard");
        }
    },[isAuthenticated,history])

    return (
        <div>
            {loading&&(
                <Loader/>
            )}
            {error&&(
                <Message variant='danger'>{error}</Message>
            )}
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                    <h2>{heading}</h2>
                    <label htmlFor="email">Email:</label>
                    <input className="form-control" type="text" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label htmlFor="password">Password:</label>
                    <input className="form-control" type="password" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    {buttonText==="Sign me up!"&&(
                        <div>
                        <label htmlFor="username">Username:</label>
                        <input className="form-control" type="text" id="username" name="username" value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
                        <label htmlFor="profileImage">Profile Image URL:</label>
                        <input className="form-control" type="text" id="profileImage" name="profileImage" value={profileImage} onChange={(e)=>{setProfileImage(e.target.value)}}/>
                    </div>
                    )}
                    <br/>
                    <button className="btn btn-primary">{buttonText}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthForm