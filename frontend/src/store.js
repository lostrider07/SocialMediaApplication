import { combineReducers, createStore, applyMiddleware } from "redux";
import { errorMessageReducer } from "./store/reducers/errorReducer";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./store/reducers/userReducer";
import {
  allMessagesReducer,
  createMessageReducer,
  deleteMessageReducer,
} from "./store/reducers/messageReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({
  deleteMessage: deleteMessageReducer,
  createMessage: createMessageReducer,
  getAllMessages: allMessagesReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  error: errorMessageReducer,
});

const initialState = {
  userLogin: {
    user: {},
  },
  error: {
    message: null,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
