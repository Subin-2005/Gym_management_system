import "./Sidebar.css";
import {FaBell, FaTachometerAlt, FaUsers, FaChartBar, FaCog, FaSignOutAlt} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useGym } from "../../context/GymContext";
import React from 'react';
import { getImageUrl, handleImageError } from "../../utils/imageUrl";

export default function Sidebar({isOpen, onNavigate}) {

    const navigate = useNavigate();
    const {gym, setGym} = useGym();

    const logout = ()=>{
        const confirmLogout = window.confirm("Are you sure you want to logout");

        if(!confirmLogout) return;

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        setGym({
            gym_name: "GymPro",
            logo: null,
            address: "",
            phone: "",
            email: "",
        });

        navigate("/login");
    };

    const logoSrc = getImageUrl(gym?.logo, "/logo.jpeg");

    return (
        <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
            <img
                src={logoSrc}
                width="70"
                height="70"
                className="rounded-circle mb-2"
                alt={gym?.gym_name || "GymPro"}
                style={{ objectFit: "cover" }}
                onError={(e) => handleImageError(e, "/logo.jpeg")}
            />

            <h4>{gym?.gym_name || "GymPro"}</h4>

            <ul>
                <li>
                    <NavLink to="/" onClick={onNavigate}>
                        <FaTachometerAlt /> Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/members" onClick={onNavigate}>
                        <FaUsers /> Members
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/notifications" onClick={onNavigate}>
                        <FaBell/> Notifications
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/reports" onClick={onNavigate}>
                        <FaChartBar /> Reports
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings" onClick={onNavigate}>
                        <FaCog /> Settings
                    </NavLink>
                </li>

                <li onClick={logout} style={{cursor: "pointer"}}>
                    <FaSignOutAlt /> Logout
                </li>
            </ul>
        </aside>
    );
}
