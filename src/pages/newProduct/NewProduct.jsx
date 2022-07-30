import './newProduct.css'
import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const [size, setSize] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleCat = (e) => {
        setCat(e.target.value.split(","))
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
                    const product = { ...inputs, img: downloadURL, categories: cat, size: size };
                    addProduct(product, dispatch);
                    navigate("/products", alert("Success Add Product"));
                });
            }
        );
    };

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input name='title' type="text" placeholder="Monstera" required={true} onChange={handleInput} />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input name='price' type="number" placeholder="30000" required={true} onChange={handleInput} />
                </div>
                <div className="addProductItem">
                    <label>Weight (Gram) </label>
                    <input name='weight' type="number" placeholder="300" required={true} onChange={handleInput} />
                </div>
                <div className="addProductItem">
                    <label>Category</label>
                    <input type="text" placeholder="aglonema,indoor" onChange={handleCat} />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <textarea name="desc" id="" cols="30" rows="10" onChange={handleInput}></textarea>
                </div>
                <div className="addProductItem">
                    <label>Size</label>
                    <input type="text" placeholder="small,medium,matur" onChange={handleSize} />
                </div>
                <button onClick={handleClick} className="addProductButton">Create</button>
            </form>
        </div>
    )
}

export default NewProduct