import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleGetReviewsForUser} from "../actions/reviews.action";
import * as PropTypes from "prop-types";
import MyReviewItem from "./MyReviewItem";


MyReviewItem.propTypes = {review: PropTypes.any};
const MyReviews = (props) => {
    const dispatch = useDispatch()

    const {reviews} = props

    const limit = 10;
    const skip = 0

    useEffect(() => {
        console.log("make call")
        dispatch(handleGetReviewsForUser(limit, skip))
    }, [dispatch])

    return (
        <div>
            <div className="my-reviews">
                <h2 className="custom-header">My Reviews</h2>
                {
                    reviews.length === 0 && (<h3 className="custom-header">No Reviews!</h3>)
                }
                {
                    reviews && (<ul style={{overflow: "scroll", overflowX: "hidden"}}>
                        {reviews && reviews.map((review, index) => (
                            <li key={index}>
                                <MyReviewItem review={review}/>
                            </li>
                        ))}
                    </ul>)
                }
            </div>
        </div>
    )
}


const mapStateToProps = (Component) => {
    return (props) => {
        const {user} = useSelector(state => state.auth)
        const allReviews = useSelector(state => state.reviews)

        const reviews = !user ? [] : Object.values(allReviews).filter((review) => review.userId === parseInt(user.id))

        return <Component {...props} reviews={reviews} user={user}/>;
    };
};

export default mapStateToProps(MyReviews);