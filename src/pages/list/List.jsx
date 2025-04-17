import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './list.scss'
import UserManagementTable from '../../components/table/UserTable'
const List = () => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className="list-container">
        <Navbar/>
        <div className="user-table">
        <UserManagementTable/>
        </div>
      </div>
    </div>
  )
}

export default List