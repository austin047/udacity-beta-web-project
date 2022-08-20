import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";


// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import LoadingBar from "react-redux-loading-bar";

import Home from "./components/Home";

import {clearErrors} from "./actions/auth.action";


import NavBar from "./components/NavBar";
import Website from "./components/Website";
import Profile from "./components/Profile";
import NewWebsite from "./components/NewWebsite";
import {cancelRedirect} from "./actions/redirect.action";
import NewReview from "./components/NewReviews";
import MyReviews from "./components/MyReview";
import NotRoute from "./components/NotRoute";


const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {user} = useSelector(state => state.auth);

    // console.log(useSelector((state) => state))


    useEffect(() => {

        dispatch(clearErrors())
        dispatch(cancelRedirect())
    }, [dispatch, location]);


    return (
        <Fragment>
            <div>
                <LoadingBar/>
                <NavBar/>

                <Routes>

                    <Route path="/" element={<Home/>}/>
                    {/*<Route path="/login" element={<Login />}/>*/}
                    {/*<Route path="/register" element={<Register/>}/>*/}

                    <Route path="/login" element={
                        <WhileExistingUserRoute user={user}>
                            <Login/>
                        </WhileExistingUserRoute>
                    }/>

                    <Route path="/register" element={
                        <WhileExistingUserRoute user={user}>
                            <Register/>
                        </WhileExistingUserRoute>
                    }/>

                    <Route path="/new-website" element={
                        <ProtectedRoute user={user}>
                            <NewWebsite/>
                        </ProtectedRoute>
                    }/>
                    =

                    {/*<Route path="/profile" element={<Profile/>} />*/}
                    <Route path="/profile" element={
                        <ProtectedRoute user={user}>
                            <Profile/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/website/:id" element={<Website/>}/>
                    <Route path="/website/:id/new-review" element={
                        <ProtectedRoute user={user}>
                            <NewReview/>
                        </ProtectedRoute>
                    }/>


                    />
                    <Route path="/my-reviews" element={
                        <ProtectedRoute user={user}>
                            <MyReviews/>
                        </ProtectedRoute>
                    }
                    />
                    <Route
                        path="*"
                        element={<NotRoute/>}
                    />

                </Routes>
            </div>
        </Fragment>
    )
};

const ProtectedRoute = ({user, children}) => {
    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

const WhileExistingUserRoute = ({user, children}) => {
    if (user) {
        return <Navigate to="/profile" replace/>;
    }

    return children;
};

//
// function PrivateRoute({ component: Component, user, ...rest }) {
//     return  <Route path="/my-reviews"  element={<Component/>}/>;
//
//     // return (
//     //     <Route {...rest} element={props => {
//     //         if (!user) {
//     //             // not logged in so redirect to login page with the return url
//     //             //navigate("/login")
//     //             return <Login />
//     //         } else {
//     //             // authorized so return component
//     //             return <Component {...props} />
//     //         }
//     //
//     //
//     //     }} />
//     // );
// }

export default App;
