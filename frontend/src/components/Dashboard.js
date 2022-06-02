import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from "react-router-dom"
import Navbar from '../containers/Navbar'
import {allMessages} from "../store/actions/messageActions"
import Loader from './Loader';
import Message from './Message';
import UserAside from './UserAside'
import MessageItem from './MessageItem'
const Dashboard = () => {
    const dispatch=useDispatch();
    const history=useHistory();
    const getAllMessages=useSelector(state=>state.getAllMessages);
    const {loading,error,success,messages}=getAllMessages;
    const userLogin=useSelector(state=>state.userLogin);
    const {isAuthenticated,user}=userLogin; 
    useEffect(()=>{
        if(!isAuthenticated){
            history.push("/");
        }
        dispatch(allMessages(user))

    },[history,isAuthenticated,dispatch,user])
  
    return (
        <>
        <Navbar/>
        <div className="row">
        <UserAside
         profileImage={user.profileImage}
         username={user.username}

         />
        {loading&&<Loader/>}
        {error&&<Message variant='danger'>{error}</Message>}
        <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
        <ul className="list-group" id="messages">
        {success&&messages.map(msg=>(
            <MessageItem
            key={msg._id}
            msgId={msg._id}
            date={msg.createdAt}
            text={msg.text}
            username={msg.user.username}
            profileImage={msg.user.profileImage}
            userId={msg.user._id}
            />
        ))}
        </ul>

        
        </div>
        
        </div>
            
        </div>
        </>
    )
}

export default Dashboard