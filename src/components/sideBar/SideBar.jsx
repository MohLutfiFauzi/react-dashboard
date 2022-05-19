import { AttachMoneyOutlined, ChatBubbleOutlineOutlined, EmailOutlined, EqualizerOutlined, FeedbackOutlined, LineStyle, PersonOutlineOutlined, ReportProblemOutlined, StorefrontOutlined, Timeline, TrendingUp, WorkOutlineOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import "./sidebar.css"
import { useLocation } from "react-router-dom";

const SideBar = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className='link'>
                            <li className={splitLocation[1] === "" ? "sidebarListItem active" : "sidebarListItem"}>
                                <LineStyle className='sidebarIcon' />
                                Home
                            </li>
                        </Link>
                        <li className={splitLocation[1] === "analytics" ? "sidebarListItem active" : "sidebarListItem"}>
                            <Timeline className='sidebarIcon' />
                            Analytics
                        </li>
                        <li className={splitLocation[1] === "sales" ? "sidebarListItem active" : "sidebarListItem"}>
                            <TrendingUp className='sidebarIcon' />
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className='link'>
                            <li className={splitLocation[1] === "users" ? "sidebarListItem active" : "sidebarListItem"}>
                                <PersonOutlineOutlined className='sidebarIcon' />
                                Users
                            </li>
                        </Link>
                        <Link to="/products" className='link'>
                            <li className={splitLocation[1] === "products" ? "sidebarListItem active" : "sidebarListItem"}>
                                <StorefrontOutlined className='sidebarIcon' />
                                Products
                            </li>
                        </Link>
                        <li className={splitLocation[1] === "transactions" ? "sidebarListItem active" : "sidebarListItem"}>
                            <AttachMoneyOutlined className='sidebarIcon' />
                            Transactions
                        </li>
                        <li className={splitLocation[1] === "reports" ? "sidebarListItem active" : "sidebarListItem"}>
                            <EqualizerOutlined className='sidebarIcon' />
                            Reports
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className={splitLocation[1] === "mail" ? "sidebarListItem active" : "sidebarListItem"}>
                            <EmailOutlined className='sidebarIcon' />
                            Mail
                        </li>
                        <li className={splitLocation[1] === "feedback" ? "sidebarListItem active" : "sidebarListItem"}>
                            <FeedbackOutlined className='sidebarIcon' />
                            Feedback
                        </li>
                        <li className={splitLocation[1] === "messages" ? "sidebarListItem active" : "sidebarListItem"}>
                            <ChatBubbleOutlineOutlined className='sidebarIcon' />
                            Messages
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className={splitLocation[1] === "manage" ? "sidebarListItem active" : "sidebarListItem"}>
                            <WorkOutlineOutlined className='sidebarIcon' />
                            Manage
                        </li>
                        <li className={splitLocation[1] === "analytics" ? "sidebarListItem active" : "sidebarListItem"}>
                            <Timeline className='sidebarIcon' />
                            Analytics
                        </li>
                        <li className={splitLocation[1] === "reports" ? "sidebarListItem active" : "sidebarListItem"}>
                            <ReportProblemOutlined className='sidebarIcon' />
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar