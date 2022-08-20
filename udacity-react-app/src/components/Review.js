import React from "react";

const Review = (props) => {
    const {review} = props;

    return (
        <div className="review-item">
            <div>
                <i style={{fontSize: '24px'}} className="fa fa-user"></i>
                <span style={{margin: '0px 0px 0px 5px'}}>{review.userName}</span>
            </div>
            <p>Average Rating: {review.rating}</p>
            <div style={{marginBottom: '5px', fontWeight: "bold"}}>Comment</div>
            <div>{review.comment}</div>
        </div>
    )
}

export default Review