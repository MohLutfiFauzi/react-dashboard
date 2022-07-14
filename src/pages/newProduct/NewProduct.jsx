import './newProduct.css'

const NewProduct = () => {
    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" />
                </div>
                <div className="addProductItem">
                    <label>Name</label>
                    <input type="text" placeholder="Monstera" required={true} />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input type="number" placeholder="123" />
                </div>
                <div className="addProductItem">
                    <label>Type</label>
                    <input type="text" placeholder="aglonema" />
                </div>
                <div className="addProductItem">
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
                <button className="addProductButton">Create</button>
            </form>
        </div>
    )
}

export default NewProduct