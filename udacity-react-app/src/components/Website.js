import {Link} from "react-router-dom";
import Review from "./Review";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleGetReviews} from "../actions/reviews.action";
import {handleGetWebsiteInfo} from "../actions/website.action";
import {withRouter} from "../helpers/util";


// const websiteInfo = {
//     "id": 1,
//     "name": "Google LLC",
//     "url": "https://www.google.com",
//     "category": "Search Enginer",
//     "description": "This is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionalityThis is a website with which provides search enginer funtionality"
// }


const Website = (props) => {
    const {id: websiteId} = props.router.params;
    const dispatch = useDispatch();

    const allReviews = useSelector((state) => state.reviews) ?? {};
    const websiteInfo = useSelector((state) => state.websites)[websiteId]

    const reviews = Object.values(allReviews).filter((review) => review.websiteId === parseInt(websiteId))

    const limit = 10;
    const skip = 0;

    useEffect(() => {
        dispatch(
            handleGetWebsiteInfo(websiteId)
        )
        dispatch(handleGetReviews(websiteId, limit, skip))
    }, [dispatch, websiteId])


    const WebsiteDetails = () => (<div className="website-detail-section">
        <h2 className="custom-header">Website Details</h2>
        <div className="website-detail">
            <p>Website Name: {websiteInfo.name} </p>
            <div>
                <span>Website Url: </span>
                <a href={websiteInfo.url} target="_blank" className="website-link"
                   rel="noreferrer">{websiteInfo.url}</a>
            </div>
            <p>Website Category: {websiteInfo.category}</p>
            <p style={{fontWeight: "bold"}}>Description</p>
            <p>{websiteInfo.description}</p>
        </div>
    </div>)

    return (
        <div>
            <div className="website-container">
                {
                    websiteInfo && <WebsiteDetails/>
                }
                <div className="website-reviews">
                    <h2 className="custom-header">Website Reviews</h2>
                    {
                        reviews.length === 0 && (<h3 className="custom-header">No Reviews!</h3>)
                    }
                    {
                        reviews && (<ul style={{overflow: "scroll", overflowX: "hidden"}}>
                            {reviews && reviews.map((review, index) => (<li key={index}><Review review={review}/></li>))}
                        </ul>)
                    }

                    <div className="form-group" style={{textAlign: "center"}}>
                        <Link to={`/website/${websiteId}/new-review`} className="form-submit">
                            <span>Add a review</span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default withRouter(Website);