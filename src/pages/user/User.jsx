import { Publish, PermIdentity, PhoneAndroid, MailOutline, LocationSearching } from '@mui/icons-material'
import ManIcon from '@mui/icons-material/Man'
import { Link } from 'react-router-dom'
import './user.css'

const User = () => {
    return (
        <div className='user'>
            <div className="userTitleContainer">
                <h2 className="userTitle">Edit Customer</h2>
                <Link to="/users">
                    <button className="userAddButton">Back</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://images.pexels.com/photos/11682017/pexels-photo-11682017.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">Justin Backer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className='userShowIcon' />
                            <span className="userShowInfoTitle">Justin Doe</span>
                        </div>
                        <div className="userShowInfo">
                            <ManIcon className='userShowIcon' />
                            <span className="userShowInfoTitle">Male</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className='userShowIcon' />
                            <span className="userShowInfoTitle">+62 989 9827 7377</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className='userShowIcon' />
                            <span className="userShowInfoTitle">Justin89@gmail.com</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className='userShowIcon' />
                            <span className="userShowInfoTitle">West Java | Indonesian</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Firstname</label>
                                <input type="text" placeholder='firstname' className='userUpdateInput' required={true} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Lastname</label>
                                <input type="text" placeholder='lastname' className='userUpdateInput' required={true} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Gender</label>
                                <input type="text" placeholder='gender' className='userUpdateInput' required={true} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder='email' className='userUpdateInput' required={true} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input type="text" placeholder='phone number' className='userUpdateInput' required={true} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input type="text" placeholder='address' className='userUpdateInput' required={true} />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img className='userUpdateImage' src="https://images.pexels.com/photos/11682017/pexels-photo-11682017.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                                <label htmlFor='file'><Publish className='userUpdateIcon' /></label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User