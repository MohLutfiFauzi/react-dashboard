import React from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { InsertStockRows } from '../../dummyData'
import { getProducts } from '../../redux/apiCalls';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

const InsertStock = () => {
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts);
    }, [dispatch]);

    const [data, setData] = useState(InsertStockRows);

    const handleDelete = (id) => {
        if (window.confirm("are you sure want to delete this ?")) {
            setData(data.filter(item => item.id !== id));
        }
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'title', headerName: 'Id Product', width: 200 },
        { field: 'createdAt', headerName: 'Date', width: 100 },
        {
            field: 'stock', headerName: 'Stock', width: 100, renderCell: (params) => {
                return params.row.stock[params.row.stock.length - 1].stockQuantity;
            },
        },
        {
            field: 'suplier', headerName: 'Suplier', width: 100, renderCell: (params) => {
                return params.row.stock[params.row.stock.length - 1].suplier;
            },
        },
        {
            field: 'numberPhone', headerName: 'Number Phone', width: 120, renderCell: (params) => {
                return params.row.stock[params.row.stock.length - 1].numberPhone;
            },
        },
        {
            field: 'idStock', headerName: 'Id Stock', width: 200, renderCell: (params) => {
                return params.row.stock[params.row.stock.length - 1]._id;
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/insertStock/" + params.row.id}>
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
                rows={products}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[5]}
                getRowId={row => row._id}
                checkboxSelection
                disableSelectionOnClick
            />
            <Link to={"/newStock/"} style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={StyleButtonAdd}>Add Stock</button>
            </Link>
        </Container>
    )
}

export default InsertStock