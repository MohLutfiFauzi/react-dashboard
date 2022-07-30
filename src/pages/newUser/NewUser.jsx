import './newUser.css'
import { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewUser = () => {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [idProvinceFromUser, setIdProvinceFromUser] = useState('');
    const [idCityFromUser, setIdCityFromUser] = useState('');

    useEffect(() => {
        const getShipping = async () => {
            try {
                let dataProvince = await axios.get('http://localhost:5000/api/v1/shipping/provinces');
                setProvinces(dataProvince.data.rajaongkir.results);
                let selectedCity = await axios.get(`http://localhost:5000/api/v1/shipping/cities/province/${idProvinceFromUser}`);
                setCities(selectedCity.data);
            } catch (e) {
                return e.message;
            }
        }
        getShipping();
    }, [idProvinceFromUser])

    const handleInput = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
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
                    const user = { ...inputs, img: downloadURL, province: idProvinceFromUser, city: idCityFromUser };
                    addUser(user, dispatch);
                    navigate("/users", alert("Success Add user"));
                });
            }
        );
    }
    return (
        <div className='newUser'>
            <h2 className="newUserTitle">New Customer</h2>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Image</label>
                    <input name='img' type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                </div>
                <div className="newUserItem">
                    <label>Firtname</label>
                    <input name='firstname' type="text" placeholder='firstname' required={true} onChange={handleInput} />
                </div>
                <div className="newUserItem">
                    <label>Lastname</label>
                    <input name='lastname' type="text" placeholder='lastname' required={true} onChange={handleInput} />
                </div>
                <div className="newUserItem">
                    <label>Number Phone</label>
                    <input name='phoneNumber' type="number" placeholder='number phone' required={true} onChange={handleInput} />
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input name='email' type="email" placeholder='email' required={true} onChange={handleInput} />
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input name='password' type="password" placeholder='password' required={true} onChange={handleInput} />
                </div>
                <div className="newUserItem">
                    <label>Province</label>
                    <select name="province" id="province" style={{ padding: "10px", borderRadius: "10px" }} onChange={(e) => setIdProvinceFromUser(e.target.value)}>
                        {provinces.map((province) => {
                            return <option value={province.province_id} id={province.province_id}>{province.province}</option>
                        })}
                    </select>
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <input name='gender' type="text" placeholder='male / female' required={true} onChange={handleInput} />
                </div>
                <div className="newUserItem">
                    <label>City</label>
                    <select name="city" id="city" style={{ padding: "10px", borderRadius: "10px" }} onChange={(e) => setIdCityFromUser(e.target.value)}>
                        {cities.map((city) => {
                            return <option value={city.city_id} id={city.city_id}>{city.city_name}</option>
                        })}
                    </select>
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input name='address' type="text" placeholder='West Java | Indonesian' required={true} onChange={handleInput} />
                </div>
                <button onClick={handleClick} className="newUserButton">Create</button>
            </form>
        </div>
    )
}
export default NewUser