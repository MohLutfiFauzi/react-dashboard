import './productList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { ProductRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState } from 'react'

const ProductList = () => {
    const [data, setData] = useState(ProductRows);

    const handleDelete = (id) => {
        if (window.confirm("are you sure want to delete this ?")) {
            setData(data.filter(item => item.id !== id));
        }
    }
    const columns = [
        { field: 'id', headerName: 'Id Product', width: 90 },
        {
            field: 'product', headerName: 'Product', width: 220, renderCell: (params) => {
                return (
                    <div className='productListItem'>
                        <img className='productListImg' src={params.row.img} alt="" />
                        {params.row.name}
                    </div>
                )
            }
        },
        { field: 'type', headerName: 'Type Of Products', width: 200 },
        {
            field: 'size',
            headerName: 'Size',
            width: 150,
        },
        {
            field: 'weight',
            headerName: 'Weight (gram)',
            width: 150,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row.id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlined className="productListDelete" onClick={() => handleDelete(params.row.id)} />
                    </>
                )
            }
        },
    ];
    return (
        <div className='productList'>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
            <Link to={"/newProduct"} className="productAddContainer">
                <button className="productAdd">Add Product</button>
            </Link>
        </div>
    )
}

export default ProductList