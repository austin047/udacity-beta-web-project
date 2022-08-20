import {Link} from "react-router-dom";

const SearchItem = ({item}) => {
    return (

        <div className="website-item">
            <div>
                <p>{item.name}</p>
                <p><a href={item.url} target="_blankt" rel="noreferrer">{item.url}</a></p>
            </div>
            <div>
                <p>Average Rating</p>
                <p style={{textAlign: "center"}}>{item.averageRating}</p>
                <Link to={`/website/${item.websiteId}`} style={{color: "inherit"}}> View Reviews</Link>
            </div>
        </div>
    )
}

export default SearchItem