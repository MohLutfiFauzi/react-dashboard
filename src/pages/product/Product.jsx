import { Link, useLocation } from 'react-router-dom'
import './product.css'
import Chart from '../../components/chart/Chart'
import { Publish } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { publicRequest } from "../../requestMethods";

const Product = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const product = useSelector(state => state.product.products.find(product => product._id === productId));
    const [category, setCategory] = useState(product.categories[1]);
    const [sizeSmall, setSizeSmall] = useState(product.size[0]);
    const [sizeMedium, setSizeMedium] = useState(product.size[1]);
    const [sizeMature, setSizeMature] = useState(product.size[2]);
    const [pStats, setPStats] = useState([]);

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
                <h2 className="productTitle">Product</h2>
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
                        <span className="productName">Monstera</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Stock:</span>
                            <span className="productInfoValue">300</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product</label>
                        <input type="text" placeholder={product.title} required={true} />
                        <label>Weight</label>
                        <input type="text" placeholder={product.weight} required={true} />
                        <label>Price</label>
                        <input type="number" placeholder={product.price} required={true} />
                        <label>Type</label>
                        <input type="text" placeholder={product.categories[0]} required={true} />
                        <label>Category</label>
                        <select name="category" id="category" onChange={setCategory} value={category}>
                            <option value="indoor">Indoor</option>
                            <option value="outdoor">Outdoor</option>
                        </select>
                        <label>Size</label>
                        <label style={{ fontSize: "14px" }}>
                            <input type="checkbox" checked={sizeSmall} onChange={() => setSizeSmall(!sizeSmall)} id="small" name="small" value="small" style={{ marginRight: "5px" }} />
                            small
                        </label>
                        <label style={{ fontSize: "14px" }}>
                            <input type="checkbox" checked={sizeMedium} onChange={() => setSizeMedium(!sizeMedium)} id="medium" name="medium" value="medium" style={{ marginRight: "5px" }} />
                            medium
                        </label>
                        <label style={{ fontSize: "14px" }}>
                            <input type="checkbox" checked={sizeMature} onChange={() => setSizeMature(!sizeMature)} id="mature" name="mature" value="mature" style={{ marginRight: "5px" }} />
                            mature
                        </label>
                    </div>
                    <div className="productFormRight">
                        <div>
                            <label htmlFor="descProduct" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                Deskripsi
                                <textarea style={{ padding: "5px" }} name="descProduct" id="descProduct" cols="50" rows="10">{product.desc}</textarea>
                            </label>
                        </div>
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file" style={{ cursor: "pointer " }}>
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product