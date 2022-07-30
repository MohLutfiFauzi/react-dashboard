import React, { useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, deleteOrder } from '../../redux/apiCalls';

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
        if (window.confirm("are you sure want to delete this ?")) {
            deleteOrder(id, dispatch);
        }
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
                        <Link to={"/transaction/" + params.row.id}>
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