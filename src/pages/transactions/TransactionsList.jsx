import React from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { TransactionRows } from '../../dummyData'

const Container = styled.div`
    flex: 4;
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
    const [data, setData] = useState(TransactionRows);

    const handleDelete = (id) => {
        if (window.confirm("are you sure want to delete this ?")) {
            setData(data.filter(item => item.id !== id));
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'product', headerName: 'Product', width: 200 },
        { field: 'count', headerName: 'Count', width: 100 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'buyer', headerName: 'Buyer', width: 120, },
        { field: 'amount', headerName: 'Amount', width: 150, },
        { field: 'date', headerName: 'Date', width: 160, },
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
                        <DeleteOutlined style={StyleDeleteButton} onClick={() => handleDelete(params.row.id)} />
                    </>
                )
            }
        },
    ];
    return (
        <Container>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
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