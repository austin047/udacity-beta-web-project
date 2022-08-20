import {useLocation, useNavigate, useParams} from "react-router-dom";

/// From an array of items. create a map with kwy as id of the items
export const mapIdToPost = (data) => {
    const map = {}
    if (Array.isArray(data)) {
        data.forEach((value) => {
            map[value.id] = value;
        })
    } else {
        map[data.id] = data
    }


    return map
}

export const mapWebsiteIdToPost = (data) => {
    const map = {}
    if (Array.isArray(data)) {
        data.forEach((value) => {
            map[value.websiteId] = value;
        })
    } else {
        map[data.id] = data
    }


    return map
}

export const withRouter = (Component) => {
    return (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{location, navigate, params}}/>;
    };
};
