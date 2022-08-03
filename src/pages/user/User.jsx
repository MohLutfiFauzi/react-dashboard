import { Publish, PhoneAndroid, MailOutline, LocationSearching, LocationCity, LocationOff, Timelapse, AdminPanelSettingsRounded } from '@mui/icons-material'
import ManIcon from '@mui/icons-material/Man'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './user.css'
import { publicRequest } from '../../requestMethods'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { updateUser } from '../../redux/apiCalls';

import Swal from 'sweetalert2';

const User = () => {
    const location = useLocation();
    const userId = location.pathname.split('/')[2];
    const [detailUser, setDetailUser] = useState({});
    const [provinceUser, setProvinceUser] = useState('');
    const [cityUser, setCityUser] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [idProvinceFromUser, setIdProvinceFromUser] = useState('');
    const [idCityFromUser, setIdCityFromUser] = useState('');
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);

    const handleInput = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        const getUserDetail = async () => {
            try {
                const resDetailUser = await publicRequest.get(`users/find/${userId}`);
                setDetailUser(resDetailUser.data);
                const province = await publicRequest.get(`shipping/provinces/${resDetailUser.data.province}`);
                setProvinceUser(province.data.rajaongkir.results.province);
                const city = await publicRequest.get(`shipping/cities/${resDetailUser.data.city}`);
                setCityUser(city.data[0].city_name);
            } catch (e) {
                console.log(e.message);
            }
        }
        getUserDetail();
    }, [userId]);

    useEffect(() => {
        const getPlace = async () => {
            try {
                let dataProvince = await publicRequest.get('http://localhost:5000/api/v1/shipping/provinces');
                setProvinces(dataProvince.data.rajaongkir.results);
                let selectedCity = await publicRequest.get(`http://localhost:5000/api/v1/shipping/cities/province/${idProvinceFromUser}`);
                setCities(selectedCity.data);
            } catch (e) {
                return e.message;
            }
        }
        getPlace();
    }, [idProvinceFromUser, idCityFromUser])

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
                    const user = { ...inputs, img: downloadURL, province: idProvinceFromUser, city: idCityFromUser, _id: userId };
                    updateUser(dispatch, user);
                    navigate("/users", Swal.fire(
                        'Update Profile!',
                        'success'
                    ));
                });
            }
        );
    };

    return (
        <div className='user'>
            <div className="userTitleContainer">
                <h2 className="userTitle">Edit User</h2>
                <Link to="/users">
                    <button className="userAddButton">Back</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={detailUser.img} alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{detailUser.firstname} {detailUser.lastname}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <AdminPanelSettingsRounded className='userShowIcon' />
                            <span className="userShowInfoTitle">{detailUser.isAdmin ? 'Admin' : 'Customer'}</span>
                        </div>
                        <div className="userShowInfo">
                            <Timelapse className='userShowIcon' />
                            <span className="userShowInfoTitle">{detailUser.createdAt}</span>
                        </div>
                        <div className="userShowInfo">
                            <ManIcon className='userShowIcon' />
                            <span className="userShowInfoTitle">{detailUser.gender}</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className='userShowIcon' />
                            <span className="userShowInfoTitle">{detailUser.phoneNumber}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className='userShowIcon' />
                            <span className="userShowInfoTitle">{detailUser.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationOff className='userShowIcon' />
                            <span className="userShowInfoTitle">{provinceUser}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationCity className='userShowIcon' />
                            <span className="userShowInfoTitle">{cityUser}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className='userShowIcon' />
                            <span className="userShowInfoTitle">{detailUser.address}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Firstname</label>
                                <input name='firstname' type="text" className='userUpdateInput' required={true} onChange={handleInput} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Lastname</label>
                                <input name='lastname' type="text" className='userUpdateInput' required={true} onChange={handleInput} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Gender</label>
                                <select name='gender' onChange={handleInput}>
                                    <option value="male" >Male</option>
                                    <option value="female" >Female</option>
                                </select>
                            </div>
                            <div className="userUpdateItem">
                                <label>Admin ?</label>
                                <select name='isAdmin' onChange={handleInput}>
                                    <option value={true} >True</option>
                                    <option value={false} >False</option>
                                </select>
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input name='email' type="text" className='userUpdateInput' required={true} onChange={handleInput} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Password</label>
                                <input name='password' type="password" className='userUpdateInput' required={true} onChange={handleInput} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input name='numberPhone' type="text" className='userUpdateInput' required={true} onChange={handleInput} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Province</label>
                                <select name="province" id="province" onChange={(e) => setIdProvinceFromUser(e.target.value)}>
                                    {provinces.map((province) => {
                                        return <option key={province.province_id} value={province.province_id} >{province.province}</option>
                                    })}
                                </select>
                            </div>
                            <div className="userUpdateItem">
                                <label>City</label>
                                <select name="city" id="city" onChange={(e) => setIdCityFromUser(e.target.value)}>
                                    {cities.map((city) => {
                                        return <option key={city.city_id} value={city.city_id} >{city.city_name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <textarea name="address" id="address" cols="30" rows="10" onChange={handleInput}></textarea>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img className='userUpdateImage' src={detailUser.img} alt="" />
                                <label htmlFor='file'><Publish className='userUpdateIcon' /></label>
                                <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                            </div>
                            <button onClick={handleClick} className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User