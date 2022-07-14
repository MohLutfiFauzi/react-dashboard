import React from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { StockRows } from '../../dummyData'

const Container = styled.div`
    flex: 4;
`

const Stock = () => {

    const columns = [
        { field: 'id', headerName: 'ID Stock', width: 90 },
        { field: 'codeProduct', headerName: 'codeProduct', width: 200 },
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'stock', headerName: 'Stock', width: 100 },
        { field: 'date', headerName: 'Date', width: 160, },
    ];
    return (
        <Container>
            <DataGrid
                rows={StockRows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
            />
        </Container>
    )
}

export default Stock