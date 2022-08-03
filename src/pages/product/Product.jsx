import { Link, useLocation, useNavigate } from 'react-router-dom'
import './product.css'
import Chart from '../../components/chart/Chart'
import { Publish } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { publicRequest } from "../../requestMethods";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { updateProduct } from '../../redux/apiCalls';

import Swal from 'sweetalert2';

const Product = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const product = useSelector(state => state.product.products.find(product => product._id === productId));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [category, setCategory] = useState(product.categories[1]);
    const [type, setType] = useState(product.categories[0]);
    const [size, setSize] = useState([]);
    const [pStats, setPStats] = useState([]);

    const [file, setFile] = useState(null);
    const [inputs, setInputs] = useState({});
    const [stock, setStock] = useState({});
    const categories = [type, category];

    const handleInput = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleStock = (e) => {
        setStock(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSize = (e) => {
        setSize(e.target.value.split(","))
    }

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                alert("there something wrong", error.message);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, img: downloadURL, categories: categories, size: size, stock: [stock], _id: productId };
                    updateProduct(dispatch, product);
                    navigate("/products", Swal.fire(
                        'Update Product!',
                        'success'
                    ));
                });
            }
        );
    };

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await publicRequest.get("orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    return (
        <div className='product'>
            <div className="productTitleContainer">
                <h2 className="productTitle">Edit Product</h2>
                <Link to="/products">
                    <button className="productAddButton">Back</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart className="productTopChart" data={pStats} dataKey="sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Stock:</span>
                            <span className="productInfoValue">{product.stock[0].stockQuantity}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Title</label>
                        <input name='title' type="text" placeholder={product.title} required={true} onChange={handleInput} />
                        <label>Weight (Gram)</label>
                        <input name='weight' type="text" placeholder={product.weight} required={true} onChange={handleInput} />
                        <label>Price</label>
                        <input name='price' type="number" placeholder={product.price} required={true} onChange={handleInput} />
                        <label>Type</label>
                        <input type="text" placeholder={type} required={true} onChange={(e) => setType(e.target.value)} />
                        <label>Category</label>
                        <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                            <option value="indoor">Indoor</option>
                            <option value="outdoor">Outdoor</option>
                        </select>
                        <label>Size</label>
                        <input type="text" placeholder="small,medium,matur" onChange={handleSize} />
                        <label>Stock</label>
                        <input name='stockQuantity' type="number" placeholder={product.stock[0].stockQuantity} required={true} onChange={handleStock} />
                        <label>Suplier</label>
                        <input name='suplier' type="text" placeholder={product.stock[0].suplier} required={true} onChange={handleStock} />
                        <label>Number Phone Suplier</label>
                        <input name='numberPhone' type="text" placeholder={product.stock[0].numberPhone} required={true} onChange={handleStock} />
                    </div>
                    <div className="productFormRight">
                        <div>
                            <label htmlFor="descProduct" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                Deskripsi
                                <textarea style={{ padding: "5px" }} name="desc" id="descProduct" cols="50" rows="10" onChange={handleInput}>{product.desc}</textarea>
                            </label>
                        </div>
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file" style={{ cursor: "pointer " }}>
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                        </div>
                        <button onClick={handleClick} className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product