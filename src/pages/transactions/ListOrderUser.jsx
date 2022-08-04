import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { publicRequest } from '../../requestMethods'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { getOrders, deleteOrder } from '../../redux/apiCalls';
import Swal from 'sweetalert2'

const Container = styled.div`
    flex: 4;
    height: 480px;
`

const StyleDeleteButton = {
    color: "rgb(243, 59, 59)",
    cursor: "pointer",
}

const StyleEditButton = {
    border: "none",
    borderRadius: "10px",
    padding: "5px 10px",
    backgroundColor: "#3bb077",
    color: "white",
    cursor: "pointer",
    marginRight: "10px",
}

const ListOrderUser = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const [userOrders, setUserOrders] = useState({});

    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const resOrderUser = await publicRequest.get(`orders/find/${userId}`);
                setUserOrders(resOrderUser.data);
            } catch (e) {
                console.log(e.message);
            }
        }
        getUserOrders();
    }, [userId]);

    useEffect(() => {
        dispatch(getOrders);
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'are you sure want to delete this ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Delete Success!',
                )
                deleteOrder(id, dispatch);
            }
        })
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'userId', headerName: 'User ID', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 100, },
        { field: 'address', headerName: 'Address', width: 160 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'createdAt', headerName: 'Date', width: 150, },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/transaction/" + params.row._id}>
                            <button style={StyleEditButton}>Edit</button>
                        </Link>
                        <DeleteOutlined style={StyleDeleteButton} onClick={() => handleDelete(params.row._id)} />
                    </>
                )
            }
        },
    ];
    return (
        <Container>
            <h2 style={{ marginBottom: '10px' }}>List User Order</h2>
            <DataGrid
                rows={userOrders}
                columns={columns}
                pageSize={10}
                getRowId={row => row._id}
                rowsPerPageOptions={[7]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Container>
    )
}

export default ListOrderUser