import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { UserRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState } from 'react'

const UserList = () => {
    const [data, setData] = useState(UserRows);

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'image', headerName: 'Image', width: 90, renderCell: (params) => {
                return (
                    <div className='userListUser'>
                        <img className='userListimg' src={params.row.avatar} alt="" />
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
            field: 'transaction',
            headerName: 'Transaction',
            width: 160,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 100,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutlined className="userListDelete" onClick={() => handleDelete(params.row.id)} />
                    </>
                )
            }
        },
    ];


    return (
        <div className='userList'>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
            <Link to={"/newUser/"} className="userAddContainer">
                <button className="userAdd">Add Customer</button>
            </Link>
        </div>
    )
}

export default UserList;