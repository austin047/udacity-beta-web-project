import React, {useEffect, useState} from "react";
import {handleSearch} from "../actions/search.action";
import {useDispatch, useSelector} from "react-redux";
import SearchItem from "./SearchItem";

const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch()

    const search = useSelector((state) => state.search)

    const limit = 4;
    const skip = 0;


    const searchList = Object.values(search).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLocaleString()
    ));

    useEffect(() => {
        dispatch(handleSearch(limit, skip, ''))
    }, [dispatch])


    const noReviews = Object.keys(search).length === 0

    function searchButton() {
        console.log(searchValue)
        dispatch(handleSearch(limit, skip, searchValue))
    }

    function searchChange(event) {
        const currentValue = event.target.value
        setSearchValue(currentValue)

        if (currentValue.length % 2 === 0) {

            dispatch(handleSearch(limit, skip
                , currentValue))
        }
    }

    function getMore() {
        dispatch(handleSearch(limit, searchList.length, searchValue))
    }


    return (
        <div className="home-container">
            <h1 className="custom-header">Website Reviews</h1>

            <div className="search-container">
                <input type="text" onChange={searchChange} value={searchValue} placeholder="Search.." name="search"/>
                <button type="submit"><i className="fa fa-search" onClick={searchButton}></i></button>
            </div>

            {
                noReviews && <h2 className="custom-header">No Reviews</h2>
            }

            <ul>{
                searchList
                    .length > 0 && (
                    searchList
                        .map((website) => (<li key={website.websiteId}><SearchItem item={website}></SearchItem></li>))
                )
            }
            </ul>

            <div style={{textAlign: "center", margin: '20px 0 50px 0'}}>
                <button onClick={getMore} style={{fontSize: 17, padding: '5px 20px'}}> Get More</button>
            </div>

        </div>
    );
};

export default Home;
