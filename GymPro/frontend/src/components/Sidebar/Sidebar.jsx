import "./Sidebar.css";
import {FaBell, FaTachometerAlt, FaUsers, FaMoneyBillWave, FaChartBar, FaCog, FaSignOutAlt} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import React from 'react'

export default function Sidebar() {

    const navigate = useNavigate();

    const logout = ()=>{
        const confirmLogout = window.confirm("Are you sure you want to logout");

        if(!confirmLogout) return;

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/");
    }
  return (
    <div className="sidebar">
      <h3 className="logo">GymPro</h3>

      <ul>

        <li>
            <NavLink to="/dashboard">
                <FaTachometerAlt /> Dashboard
            </NavLink>
        </li>

        <li>
            <NavLink to="/members">
                <FaUsers /> Members
            </NavLink>
        </li>

        <li>
            <NavLink to="/notifications">
               <FaBell/> Notifications
            </NavLink>
        </li>

        <li>
            <FaMoneyBillWave /> Payments
        </li>

        <li>
            <NavLink to="/reports">
                <FaChartBar /> Reports
            </NavLink>
        </li>

        <li>
            <NavLink to="/settings">
                <FaCog /> Settings
            </NavLink>
        </li>

        <li onClick={logout} style={{cursor: "pointer"}}>
            <FaSignOutAlt /> Logout
        </li>

      </ul>

    

    </div>
  )
}








