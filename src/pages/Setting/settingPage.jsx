import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import SettingsPage from '../../components/Setting/setting'
import './setting.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
const SettingPage = () => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className="list-container">
        <Navbar/>
        <div className="user-table">
        <SettingsPage/>
        </div>
      </div>
    </div>
  )
}

export default SettingPage