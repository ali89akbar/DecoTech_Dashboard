import React from 'react'
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SellIcon from '@mui/icons-material/Sell';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
        <span className="logo">Ali Admin</span>
        </div>
        <hr />
        <div className="center">
            <ul>
            <p className="title">MAIN</p>
                <li>
                <DashboardIcon  className="icon"/>
            <span>Dashboard</span>
            </li>
            <li>
              <PersonIcon className="icon"/>
            <span>Users</span>
            </li>
            <p className="title">USEFUL</p>

            <li>
              <SellIcon className="icon"/>
            <span>Orders</span>
            </li>
            <p className="title">PRODUCTS</p>

            <li>
              <ProductionQuantityLimitsIcon className="icon"/>
            <span>Products</span>
            </li>
            <p className="title">SETTINGS</p>

            <li>
              <SettingsIcon className="icon"/>
            <span>Settings</span>
            </li>
            <p className="title">PROFILE</p>

            <li>
              <AccountCircleIcon className="icon"/>
              <span>Profile</span>
            </li>
            <p className="title">LOGOUT</p>
            <li>
              <ExitToAppIcon className="icon"/>
              <span>
              Logout
              </span></li>
            </ul>
            </div>
    <div className="bottom"></div>
   
    </div>
  )
}

export default Sidebar