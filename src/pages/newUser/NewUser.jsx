import './newUser.css'

const NewUser = () => {
    return (
        <div className='newUser'>
            <h2 className="newUserTitle">New Customer</h2>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Firtname</label>
                    <input type="text" placeholder='firstname' required={true} />
                </div>
                <div className="newUserItem">
                    <label>Lastname</label>
                    <input type="text" placeholder='lastname' required={true} />
                </div>
                <div className="newUserItem">
                    <label>Number Phone</label>
                    <input type="number" placeholder='number phone' required={true} />
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder='email' required={true} />
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" placeholder='password' required={true} />
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input type="text" placeholder='West Java | Indonesian' required={true} />
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name='gender' id='male' value='male' />
                        <label for='male'>Male</label>
                        <input type="radio" name='gender' id='female' value='female' />
                        <label for='female'>Female</label>
                    </div>
                </div>
                <button className="newUserButton">Create</button>
            </form>
        </div>
    )
}

export default NewUser