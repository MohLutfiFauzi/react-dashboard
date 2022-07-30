import React from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { getProducts } from '../../redux/apiCalls';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Container = styled.div`
    flex: 4;
`

const Stock = () => {
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts);
    }, [dispatch]);

    const columns = [
        { field: '_id', headerName: 'ID Product', width: 210 },
        { field: 'title', headerName: 'Name', width: 200 },
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
    ];
    return (
        <Container>
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={row => row._id}
                pageSize={10}
                rowsPerPageOptions={[5]}
            />
        </Container>
    )
}

export default Stock