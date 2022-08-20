import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleLogout} from "../actions/auth.action";

const Profile = () => {
    const user = useSelector((state) => state.auth.user)
    // const navigator = useNavigate()
    const dispatch = useDispatch()

    // useEffect(() =>{
    //     if(!user) {
    //         navigator('/login')
    //     }
    // })

    const logout = () => {
        dispatch(handleLogout())
    }


    return (
        user && (<div className="card card-container">

            <div style={{textAlign: "center"}}>
                <i style={{fontSize: '60px'}} className="fa fa-user"></i>
            </div>
            <div className="profile-items">
                <span className="profile-items-label">Name</span>
                <div className="large-text">{user.userName}</div>
            </div>

            <div className="profile-items">
                <div className="profile-items-label">email</div>
                <div className="large-text">{user.email}</div>
            </div>

            <div style={{textAlign: "center"}} onClick={logout}>
                <button className="logout-button">
                    <span>Logout</span>
                </button>
            </div>

        </div>)
    )
}

export default Profile