import { Visibility } from "@mui/icons-material"
import { useState, useEffect } from "react"
import "./widgetSm.css"
import axios from 'axios';
import { Link } from "react-router-dom";

const WidgetSm = () => {
    const [user, setUsers] = useState([]);

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/users?new=true");
                setUsers(res.data)
            } catch (e) {
                console.log(e.message)
            }
        };
        makeRequest();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {user.map((userItem) => {
                    return <li key={userItem._id} className="widgetSmItem">
                        <img src={userItem.img} alt="" className="widgetSmImg" />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{userItem.firstname}</span>
                            <span className="widgetSmUserTitle">{userItem.lastname}</span>
                        </div>
                        <Link to={"/user/" + userItem._id}>
                            <button className="widgetSmButton">
                                <Visibility className="widgetSmIcon" />
                                Display
                            </button>
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default WidgetSm