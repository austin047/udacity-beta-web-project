import {Link} from "react-router-dom";
import React from "react";

function MyReviewItem(props) {
    return <div className="review-item">
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div>
                <div>
                    <i style={{fontSize: "24px"}} className="fa fa-user"></i>
                    <span style={{margin: "0px 0px 0px 5px"}}>{props.review.userName}</span>
                </div>
                <div style={{paddingTop: "10px"}}>
                    <span>Website Url:</span>
                    <a style={{padding: "0px 0px 0px 10px"}} href={props.review.websiteUrl}
                       target="_blankt">{props.review.websiteUrl}</a>
                </div>

                <p>Average Rating: {props.review.rating}</p>
                <div style={{marginBottom: "5px", fontWeight: "bold"}}>Comment</div>
                <div>{props.review.comment}</div>
            </div>
            <div style={{marginRight: "40px"}}>
                <Link to={`/website/${props.review.websiteId}`} style={{color: "inherit", maxHeight: "20px",}}> View
                    Reviews</Link>
            </div>
        </div>

    </div>;
}


export default MyReviewItem;