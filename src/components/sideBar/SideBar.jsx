import { AttachMoneyOutlined, EqualizerOutlined, LineStyle, PersonOutlineOutlined, StorefrontOutlined, WorkOutlineOutlined } from '@mui/icons-material'
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
                        <Link to="/users" className='link'>
                            <li className={splitLocation[1] === "users" ? "sidebarListItem active" : "sidebarListItem"}>
                                <PersonOutlineOutlined className='sidebarIcon' />
                                Customers
                            </li>
                        </Link>
                        <Link to="/products" className='link'>
                            <li className={splitLocation[1] === "products" ? "sidebarListItem active" : "sidebarListItem"}>
                                <StorefrontOutlined className='sidebarIcon' />
                                Products
                            </li>
                        </Link>
                        <Link to="/transactionslist" className='link'>
                            <li className={splitLocation[1] === "transactionslist" ? "sidebarListItem active" : "sidebarListItem"}>
                                <AttachMoneyOutlined className='sidebarIcon' />
                                Transactions
                            </li>
                        </Link>
                        <Link to="/insertstock" className='link'>
                            <li className={splitLocation[1] === "insertstock" ? "sidebarListItem active" : "sidebarListItem"}>
                                <EqualizerOutlined className='sidebarIcon' />
                                Insert Stock
                            </li>
                        </Link>
                        <Link to="/stock" className='link'>
                            <li className={splitLocation[1] === "stock" ? "sidebarListItem active" : "sidebarListItem"}>
                                <WorkOutlineOutlined className='sidebarIcon' />
                                Stock
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar