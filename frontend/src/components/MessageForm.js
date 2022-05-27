import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom';
import Navbar from '../containers/Navbar'
import {useSelector,useDispatch} from 'react-redux'
import Loader from './Loader';
import Message from './Message';
import {addMessage} from "../store/actions/messageAction"
import {CREATE_MESSAGE_RESET} from "../store/constants/messageConstants"
const MessageForm = () => {
    const history=useHistory();
    const dispatch=useDispatch();
    const [text,setText]=useState("");
    const userLogin=useSelector(state=>state.userLogin);
    const createMessage=useSelector(state=>state.createMessage);
    const {loading,error,success}=createMessage;
    const {isAuthenticated,user}=userLogin;
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(addMessage(user,text));
        setText("")
    }
    const handleBack=(e)=>{
        e.preventDefault();
        dispatch({
            type:CREATE_MESSAGE_RESET
        })
        history.push("/dashboard");

    }
    useEffect(()=>{

        if(!isAuthenticated){
            history.push("/")
        }
    },[isAuthenticated,history,success])

    return (
        <>
        {loading&&(<Loader/>)}
        {error&&(
            <Message variant="danger">{error}</Message>
        )}
        <Navbar/>
        <div className="row justify-content-md-center text-center">
        <div className="col-md-6">
        <form>
            <input className="form-control" type="text" id="text" name="text" value={text} onChange={(e)=>setText(e.target.value)}/>
            <br/>
            <button className="btn btn-success" onClick={handleSubmit}>Add my message!</button>
            </form>
            {success&&(
                <Message variant="success">Message has been added successfully</Message>
                
            )}
            <br/>
            <button className="btn btn-success" onClick={handleBack}>Go Back</button>
        </div>
        </div>
        </>
    )
}

export default MessageForm