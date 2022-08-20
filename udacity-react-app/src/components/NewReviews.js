import Form from "react-validation/build/form";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {withRouter} from "../helpers/util";
import {handleAddReview} from "../actions/reviews.action";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


const validComment = (value) => {
    if (value.length < 3 || value.length > 2000) {
        return (
            <div className="alert-danger" role="alert">
                Website Name must be between 3 and 20 characters long.
            </div>
        );
    }
};

const websiteReviews = [
    1, 2, 3,
    4, 5
]

const NewReview = (props) => {
    const {id: websiteId} = props.router.params;
    const form = useRef();
    const checkBtn = useRef();

    const [comment, setComment] = useState();
    const [ratingOption, setRatingOption] = useState(0);

    const {message} = useSelector(state => state.message);
    const {errors} = useSelector(state => state.message);
    const redirect = useSelector(state => state.redirect);

    const websiteInfo = useSelector((state) => state.websites)[parseInt(websiteId)]


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onChangeComment = (e) => {
        const websiteName = e.target.value;
        setComment(websiteName);
    };

    const onChangeRating = (e) => {
        const category = e.target.value;
        setRatingOption(category)
    };


    useEffect(() => {
        if (redirect) {
            navigate(redirect)
        }
    })


    const createWebsite = (e) => {
        e.preventDefault();

        console.log({
            "websiteId": websiteId,
            "comment": comment,
            "rating": ratingOption
        })
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            const reviewInfo = {
                "websiteId": websiteId,
                "comment": comment,
                "rating": ratingOption
            }

            dispatch(handleAddReview(reviewInfo))

            console.log(reviewInfo)

        }
    };


    return (
        <div>
            {
                websiteInfo && (<h3 className="custom-header">{websiteInfo.name}</h3>)
            }
            <div className="new-website-container">
                <div className="new-website-card">
                    <Form onSubmit={createWebsite} ref={form}>
                        <label htmlFor="rating">Rating</label>
                        <Select onChange={onChangeRating} name="rating" value={ratingOption} validations={[required]}>
                            <option value="">Select a rating</option>
                            {
                                websiteReviews && websiteReviews.map(
                                    (category, index) => (
                                        <option value={category} key={index}>{category}</option>
                                    )
                                )
                            }


                        </Select>

                        <label htmlFor="Comment">Comment</label>
                        <Textarea
                            style={{height: '200px'}}
                            className="form-input"
                            name="url"
                            placeholder="Write something, every ones review count..."
                            value={comment}
                            onChange={onChangeComment}
                            validations={[required, validComment]}

                        />


                        <div className="form-group" style={{textAlign: "center"}}>
                            <button className="form-submit">
                                <span>Create Review</span>
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

export default withRouter(NewReview)































