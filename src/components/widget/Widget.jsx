import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './widget.scss'
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
const Widget = ({type}) => {
    let data;
    switch (type) {
        case "user":
          data = {
            title: "USERS",
            isMoney: false,
            link: "See all users",
            icon: (
              <PersonOutlineIcon
                className="icon"
                style={{
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
              />
            ),
          };
          break;
        case "order":
          data = {
            title: "ORDERS",
            isMoney: false,
            link: "View all orders",
            icon: (
              <ShoppingCartOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                  color: "goldenrod",
                }}
              />
            ),
          };
          break;
        case "earning":
          data = {
            title: "EARNINGS",
            isMoney: true,
            link: "View net earnings",
            icon: (
              <MonetizationOnOutlinedIcon
                className="icon"
                style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
              />
            ),
          };
          break;
        case "balance":
          data = {
            title: "BALANCE",
            isMoney: true,
            link: "See details",
            icon: (
              <AccountBalanceWalletOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                  color: "purple",
                }}
              />
            ),
          };
          break;
        default:
          break;
      }
      const money='$ 100';

  return (
    <div className='widget'>
        <div className="left">
            <span className="title">{data?.title}</span>
            <span className="counter">{data?.isMoney} {money}</span>
            <div className="link">{data?.link}</div>
        </div>
        <div className="right">
            <div className="percentage">
< KeyboardArrowUpIcon />
80%
            </div>
            {data?.icon}
        </div>
    </div>
  )
}

export default Widget