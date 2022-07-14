import { Link } from 'react-router-dom'
import './product.css'
import Chart from '../../components/chart/Chart'
import { productData } from '../../dummyData'
import { Publish } from '@mui/icons-material'

const Product = () => {
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
                    <Chart className="productTopChart" data={productData} dataKey="sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src="https://images.unsplash.com/photo-1632312527047-61fc22faed62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fG1vbnN0ZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="productInfoImg" />
                        <span className="productName">Monstera</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">1</span>
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
                        <input type="text" placeholder="name of product" required={true} />
                        <label>Price</label>
                        <input type="number" placeholder="price" required={true} />
                        <label>Type</label>
                        <input type="text" placeholder="type of product" required={true} />
                        <label>Size</label>
                        <label style={{ fontSize: "14px" }}>
                            <input type="checkbox" id="small" name="small" value="small" style={{ marginRight: "5px" }} />
                            small
                        </label>
                        <label style={{ fontSize: "14px" }}>
                            <input type="checkbox" id="medium" name="medium" value="medium" style={{ marginRight: "5px" }} />
                            medium
                        </label>
                        <label style={{ fontSize: "14px" }}>
                            <input type="checkbox" id="mature" name="mature" value="mature" style={{ marginRight: "5px" }} />
                            mature
                        </label>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src="https://images.unsplash.com/photo-1632312527047-61fc22faed62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fG1vbnN0ZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="productUploadImg" />
                            <label for="file">
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