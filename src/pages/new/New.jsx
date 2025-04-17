import React from 'react'
import MeetingCalendarView from '../../components/Calender/Calender'
import './New.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
const New = () => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className="list-container">
        <Navbar/>
        <div className="user-table">
        <MeetingCalendarView/>
        </div>
      </div>
    </div>
  )
}

export default New