import { AttachMoneyOutlined, ChatBubbleOutlineOutlined, EmailOutlined, EqualizerOutlined, FeedbackOutlined, LineStyle, PersonOutlineOutlined, ReportProblemOutlined, StorefrontOutlined, Timeline, TrendingUp, WorkOutlineOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import "./sidebar.css"

const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className='link'>
                            <li className="sidebarListItem active">
                                <LineStyle className='sidebarIcon' />
                                Home
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className='sidebarIcon' />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className='sidebarIcon' />
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className='link'>
                            <li className="sidebarListItem">
                                <PersonOutlineOutlined className='sidebarIcon' />
                                Users
                            </li>
                        </Link>
                        <Link to="/products" className='link'>
                            <li className="sidebarListItem">
                                <StorefrontOutlined className='sidebarIcon' />
                                Products
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <AttachMoneyOutlined className='sidebarIcon' />
                            Transactions
                        </li>
                        <li className="sidebarListItem">
                            <EqualizerOutlined className='sidebarIcon' />
                            Reports
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <EmailOutlined className='sidebarIcon' />
                            Mail
                        </li>
                        <li className="sidebarListItem">
                            <FeedbackOutlined className='sidebarIcon' />
                            Feedback
                        </li>
                        <li className="sidebarListItem">
                            <ChatBubbleOutlineOutlined className='sidebarIcon' />
                            Messages
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutlineOutlined className='sidebarIcon' />
                            Manage
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className='sidebarIcon' />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
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