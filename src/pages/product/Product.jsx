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
                <Link to="/newProduct">
                    <button className="productAddButton">Create</button>
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
                            <span className="productInfoValue">123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">4322</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">active:</span>
                            <span className="productInfoValue">yes</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">no</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder="Monstera" required={true} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
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