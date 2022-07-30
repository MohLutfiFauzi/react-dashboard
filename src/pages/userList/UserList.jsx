import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const UserList = () => {
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers);
    }, [dispatch])

    const handleDelete = (id) => {
        if (window.confirm("are you sure want to delete this ?")) {
            deleteUser(id, dispatch);
        }
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 240 },
        {
            field: 'img', headerName: 'Image', width: 90, renderCell: (params) => {
                return (
                    <div className='userListUser'>
                        <img className='userListimg' src={params.row.img} alt="" />
                    </div>
                )
            }
        },
        { field: 'firstname', headerName: 'firstname', width: 100 },
        { field: 'lastname', headerName: 'lastname', width: 100 },
        { field: 'email', headerName: 'Email', width: 160 },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 120,
        },
        {
            field: 'isAdmin',
            headerName: 'Admin',
            width: 90,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutlined className="userListDelete" onClick={() => handleDelete(params.row._id)} />
                    </>
                )
            }
        },
    ];


    return (
        <div className='userList'>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                getRowId={row => row._id}
                checkboxSelection
                disableSelectionOnClick
            />
            <Link to={"/newUser/"} className="userAddContainer">
                <button className="userAdd">Add User</button>
            </Link>
        </div>
    )
}

export default UserList;