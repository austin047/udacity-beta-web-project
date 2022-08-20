import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {handleLoginUser} from "../actions/auth.action";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {errors} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);


    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(handleLoginUser(email, password))
        } else {
        }
    };


    return (
        <div className="registration-container">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <label htmlFor="username">Email</label>
                    <Input
                        type="text"
                        className="form-input"
                        name="username"
                        value={email}
                        onChange={onChangeUsername}
                        validations={[required]}
                    />

                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        className="form-input"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                    />

                    <div className="form-group">
                        <button className="form-submit">
                            {/*disabled={loading}*/}
                            {/*{loading && (*/}
                            {/*  <span className="spinner-border spinner-border-sm"></span>*/}
                            {/*)}*/}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    {
                        errors && (
                            <div>
                                <ul className="form-message">
                                    {errors.map((error, index) => (<li className="alert-danger" key={index}>{error}</li>))}
                                </ul>
                            </div>

                        )
                    }
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    );
};

export default Login;
