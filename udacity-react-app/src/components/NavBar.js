import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const NavBar = () => {
    const [currentPage, setCurrentPage] = useState("")
    const location = useLocation()

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
            const currentPath = location.pathname.split('/')[1]
            setCurrentPage(currentPath)
        }, [location]
    )

    // const redirect = useSelector(state => state.redirect)
    //console.log("Navigation", redirect)

    return (
        <div className="navigation-bar">
            <ul className="navigation-list">
                <li>
                    <div className="signup-register-section">
                        <div hidden={user} style={{backgroundColor: currentPage === 'register' ? '#111' : 'inherit'}}>
                            <Link to="/register">SignUp</Link>
                        </div>
                        <div hidden={user} style={{backgroundColor: currentPage === 'login' ? '#111' : 'inherit'}}>
                            <Link to="/login">SignIn</Link>
                        </div>
                        <div style={{backgroundColor: currentPage === 'profile' ? '#111' : 'inherit'}}>
                            <Link to="/profile">My Profile</Link>
                        </div>
                    </div>
                </li>

                <li style={{backgroundColor: currentPage === 'my-reviews' ? '#111' : 'inherit'}}>
                    <Link to="/my-reviews">My Reviews</Link></li>
                <li style={{backgroundColor: currentPage === 'new-website' ? '#111' : 'inherit'}}>
                    <Link to="/new-website">New Website</Link></li>
                <li style={{backgroundColor: currentPage === '' ? '#111' : 'inherit'}}>
                    <Link to="/">Home</Link></li>

            </ul>
        </div>
    )
}

export default NavBar