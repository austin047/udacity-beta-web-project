import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {handleAddWebsite} from "../actions/website.action";
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

const validUrl = (value) => {
    if (!validator.isURL(value)) {
        return (
            <div data-testid="invalid-url" className="alert-danger" role="alert">
                This is not a valid url.
            </div>
        );
    }
};

const validWebsiteName = (value) => {
    if (value.length < 3 || value.length > 40) {
        return (
            <div data-testid="website-name-length" className="alert-danger" role="alert">
                Website Name must be between 3 and 40 characters long.
            </div>
        );
    }
};

const websiteCategories = [
    "Wiki",
    "Social Media",
    "Search Engine",
    "Online Store",
    "Live Chat",
    "Biology",
    "Medical Website",
    "Bitcoin",
    "Politics",
    "Provision",
    "Development"
]

const NewWebsite = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [websiteName, setWebsiteName] = useState("");
    const [urlText, setUrlText] = useState("");
    const [descriptionText, setDescription] = useState("");
    const [categoryOption, setCategoryOption] = useState("");


    const {message} = useSelector(state => state.message);
    const {errors} = useSelector(state => state.message);
    const redirectTo = useSelector(state => state.redirect)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onChangeWebsiteName = (e) => {
        const websiteName = e.target.value;
        setWebsiteName(websiteName);
    };

    const onChangeCategory = (e) => {
        const category = e.target.value;
        setCategoryOption(category)
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const onChangeUrl = (e) => {
        const email = e.target.value;
        setUrlText(email);
    };

    useEffect(() => {
        if (redirectTo) {
            navigate(redirectTo)
        }
    })


    const createWebsite = (e) => {
        e.preventDefault();

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            const websiteInfo = {
                "name": websiteName,
                "url": urlText,
                "category": categoryOption,
                "description": descriptionText
            }

            dispatch(handleAddWebsite(websiteInfo))
        }
    };


    return (
        <div>
            <div className="new-website-container">
                <div className="new-website-card">
                    <Form onSubmit={createWebsite} ref={form}>
                        <label htmlFor="website-name">Website Name</label>
                        <Input
                            type="text"
                            className="form-input"
                            name="website-name"
                            placeholder="Enter website name"
                            value={websiteName}
                            data-testid="website-name-input"
                            onChange={onChangeWebsiteName}
                            validations={[required, validWebsiteName]}
                        />

                        <label htmlFor="url">Website Url</label>
                        <Input
                            type="text"
                            className="form-input"
                            name="url-text"
                            placeholder="https://example.com"
                            value={urlText}
                            data-testid="url-input"
                            onChange={onChangeUrl}
                            validations={[required, validUrl]}
                        />

                        <label htmlFor="category">Category</label>
                        <Select
                            onChange={onChangeCategory}
                            name="category"
                            value={categoryOption}
                            data-testid="category-input"
                            validations={[required]}>
                            <option value="">Select a category.....</option>
                            {
                                websiteCategories && websiteCategories.map(
                                    (category, index) => (
                                        <option key={index} value={category}>{category} </option>
                                    )
                                )
                            }


                        </Select>

                        <label htmlFor="Description">Description</label>
                        <textarea
                            value={descriptionText}
                            style={{height: '200px'}}
                            className="form-input"
                            name="url"
                            placeholder="Write something..."
                            onChange={onChangeDescription}
                        />


                        <div className="form-group" style={{textAlign: "center"}}>
                            <button data-testid="submit-button" className="form-submit">
                                <span>Create Website</span>
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
                                        {errors.map((error, index) => (
                                            <li className="alert-danger" key={index}>{error}</li>))}
                                    </ul>
                                </div>

                            )
                        }
                        <CheckButton style={{display: "none"}} ref={checkBtn}/>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default NewWebsite































