import React, { useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, deleteOrder } from '../../redux/apiCalls';
import Swal from 'sweetalert2'

const Container = styled.div`
    flex: 4;
    height: 480px;
`

const StyleButtonAdd = {
    border: "none",
    borderRadius: "10px",
    padding: "5px 20px",
    backgroundColor: "rgb(55, 0, 255)",
    color: "white",
    cursor: "pointer",
    fontSize: "large",
    marginTop: "20px",
    marginBottom: "20px",
}

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

const TransactionsList = () => {
    const orders = useSelector((state) => state.order.orders);
    const dispatch = useDispatch();

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
        { field: 'userId', headerName: 'User Id', width: 200, },
        { field: 'amount', headerName: 'Amount', width: 100, },
        { field: 'address', headerName: 'Address', width: 160 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'createdAt', headerName: 'Date', width: 160, },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/listorderuser/" + params.row.userId}>
                            <button style={StyleEditButton}>see</button>
                        </Link>
                        <DeleteOutlined style={StyleDeleteButton} onClick={() => handleDelete(params.row._id)} />
                    </>
                )
            }
        },
    ];
    return (
        <Container>
            <DataGrid
                rows={orders}
                columns={columns}
                pageSize={10}
                getRowId={row => row._id}
                rowsPerPageOptions={[7]}
                checkboxSelection
                disableSelectionOnClick
            />
            <Link to={"/newTransaction/"} className="userAddContainer">
                <button style={StyleButtonAdd}>Add Transaction</button>
            </Link>
        </Container>
    )
}

export default TransactionsList