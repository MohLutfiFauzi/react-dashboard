import './productList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../../redux/apiCalls';

const ProductList = () => {
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts);
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("are you sure want to delete this ?")) {
            deleteProduct(id, dispatch);
        }
    }

    const columns = [
        { field: '_id', headerName: 'Id Product', width: 180 },
        {
            field: 'product', headerName: 'Product', width: 220, renderCell: (params) => {
                return (
                    <div className='productListItem'>
                        <img className='productListImg' src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                )
            }
        },
        { field: 'categories', headerName: 'Categories', width: 150 },
        {
            field: 'size',
            headerName: 'Size',
            width: 150,
        },
        {
            field: 'weight',
            headerName: 'Weight (gram)',
            width: 100,
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
                        <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlined className="productListDelete" onClick={() => handleDelete(params.row._id)} />
                    </>
                )
            }
        },
    ];
    return (
        <div className='productList'>
            <DataGrid
                rows={products}
                columns={columns}
                pageSize={7}
                getRowId={row => row._id}
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