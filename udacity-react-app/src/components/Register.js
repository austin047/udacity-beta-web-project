import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {handleRegisterUser} from "../actions/auth.action";
import validator from 'validator';

const required = (value) => {
    if (!value) {
        return (
            <div data-testid="error-header" className="alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!validator.isEmail(value)) {
        return (
            <div data-testid="invalid-email" className="alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div data-testid="username-length" className="alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const  = useState(false);

    // console.log(
    //     useSelector(state => state)
    // )
    const {isLoggedIn, errors} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    // console.log("States")
    // console.log(errors)



    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(handleRegisterUser(username, email, password))
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

                <Form onSubmit={handleRegister} ref={form}>
                    {!isLoggedIn && (
                        <div className="registration-container">
                            <div>
                                <label htmlFor="username">Username</label>
                                <Input
                                    data-testid="username-input"
                                    type="text"
                                    name="username"
                                    className="form-input"
                                    value={username}
                                    placeholder="Your username"
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <Input
                                    data-testid="email-input"
                                    type="text"
                                    name="email"
                                    className="form-input"
                                    value={email}
                                    placeholder="Enter Email"
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <Input
                                    data-testid="password-input"
                                    type="password"
                                    name="password"
                                    value={password}
                                    className="form-input"
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div>
                                <button data-testid="submit-button" className="form-submit">Sign Up</button>
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

export default Register;
