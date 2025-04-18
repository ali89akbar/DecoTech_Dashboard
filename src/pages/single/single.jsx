import React from 'react'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import UserPerformanceChart from '../../components/performance/Performance'
import './single.scss';
import { Typography } from '@mui/material'
const Single = () => {
  return (
    <div className='list'>
    <Sidebar/>
    <div className="list-container">
      <Navbar/>
      <div className="user-table">
      <UserPerformanceChart/>
      </div>
      <div className="user-table">
      <Typography variant='h5' style={{ paddingTop: '10px'}}>Monthly Performance</Typography>
      <Chart/>
      
      </div>
    </div>
  </div>
  )
}

export default Single