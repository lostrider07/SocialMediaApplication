import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeMessage } from "../store/actions/messageActions";
import DefaultProfileImage from "../images/default-profile-image.jpg";
const MessageItem = ({ date, text, profileImage, username, userId, msgId }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const { id } = user;
  console.log("id", id);
  console.log("User Id", userId);
  let pimage = DefaultProfileImage;
  if (profileImage) {
    pimage = profileImage.length > 0 ? profileImage : DefaultProfileImage;
  }

  const delMessage = (user, messageId) => {
    dispatch(removeMessage(user, messageId));
  };

  return (
    <div>
      <li className="list-group-item">
        <img
          src={pimage}
          alt={username}
          height="100"
          width="100"
          className="timeline-image"
        />

        <div className="message-area">
          <Link to="/">@{username} &nbsp;</Link>
          <br />
          <span className="text-muted">
            <Moment className="text-muted" format="Do MMM YYYY">
              {date}
            </Moment>
          </span>
          <p>{text}</p>
          {user && id === userId ? (
            <button
              onClick={delMessage(user, msgId)}
              className="btn btn-danger"
            >
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
      </li>
    </div>
  );
};

export default MessageItem;
