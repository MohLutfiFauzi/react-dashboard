import { AccountCircle, AttachMoneyOutlined, EqualizerOutlined, LineStyle, Logout, PersonOutlineOutlined, StorefrontOutlined, WorkOutlineOutlined } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import "./sidebar.css"
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/userRedux';
import Swal from 'sweetalert2'

const SideBar = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'are you sure you want to leave?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Logout Success!',
                    'success'
                )
                dispatch(logoutSuccess());
                navigate('/');
            }
        })
    }

    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sideBarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/dashboard" className='link'>
                            <li className={splitLocation[1] === "dashboard" ? "sidebarListItem active" : "sidebarListItem"}>
                                <LineStyle className='sidebarIcon' />
                                Home
                            </li>
                        </Link>
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
                        <Link to="/account" className='link' >
                            <li className={splitLocation[1] === "account" ? "sidebarListItem active" : "sidebarListItem"}>
                                <AccountCircle className='sidebarIcon' />
                                Account
                            </li>
                        </Link>
                        <li className={"sidebarListItem"} onClick={handleLogout}>
                            <Logout className='sidebarIcon' />
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar