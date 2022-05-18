import {GET_ALL_MESSAGES_FAIL,GET_ALL_MESSAGES_REQUEST,GET_ALL_MESSAGES_SUCCESS
    ,CREATE_MESSAGE_FAIL,CREATE_MESSAGE_REQUEST,CREATE_MESSAGE_SUCCESS,CREATE_MESSAGE_RESET,
    DELETE_MESSAGE_FAIL,DELETE_MESSAGE_REQUEST,DELETE_MESSAGE_SUCCESS} from "../constants/messageConstants";
    
    
    export const allMessagesReducer=(state={messages:[]},action)=>{
        switch(action.type){
            case GET_ALL_MESSAGES_REQUEST:
                return{
                    loading:true,
                    messages:[],
                    success:false
                }
            case GET_ALL_MESSAGES_SUCCESS:
                return{
                    loading:false,
                    messages:action.payload,
                    success:true
                }
            case GET_ALL_MESSAGES_FAIL:
                return{
                    loading:false,
                    error:action.payload,
                    success:false
                }
            default:return state;
        }
    }

    export const createMessageReducer=(state={message:""},action)=>{
        switch(action.type){
            case CREATE_MESSAGE_REQUEST:return{
                loading:true,
                success:false
            }
            case CREATE_MESSAGE_SUCCESS:return{
                loading:false,
                success:true,
                message:action.payload
            }
            case CREATE_MESSAGE_FAIL:return{
                loading:false,
                success:false,
                error:action.payload
            }
            case CREATE_MESSAGE_RESET:return{
                message:"",
                success:false
            }
            default:return state;
        }
    }