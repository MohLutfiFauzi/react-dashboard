import { Language, NotificationsNone, Settings } from '@mui/icons-material'
import React from 'react'
import './topbar.css'

const TopBar = () => {
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topleft">
                    <spam className="logo">Finding Flower</spam>
                </div>
                <div className="topright">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <img src="https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="woman face" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}

export default TopBar