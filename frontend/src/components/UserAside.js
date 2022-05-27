import React from 'react'
import DefaultProfile from "../images/default-profile-image.jpg"
const UserAside = ({username,profileImage}) => {
    let dp=DefaultProfile;
    if(profileImage){
        dp=profileImage;
    }
    return (
        <aside className="col-sm-2">
            <div className="panel panel-default">
                <div className="panel-body">
                    <img className="img-thumbnail" src={dp} width="200" height="200" alt={username}/>      
                    <h4>{username}</h4>   
                </div>
            </div>
        </aside>
    )
}

export default UserAside