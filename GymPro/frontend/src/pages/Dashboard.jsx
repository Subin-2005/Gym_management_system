import React from 'react'
import {
  FaUsers,
  FaUserCheck,
  FaClock,
  FaTimesCircle,
  FaRupeeSign,
  FaCalendarAlt,
} from "react-icons/fa";

import { useEffect, useState } from 'react';

import api from '../services/api';

import MainLayout from '../layouts/MainLayout'
import StatCard from '../components/Cards/StatCard'

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(()=>{
        loadDashboard();
    }, []);

    const loadDashboard = async ()=>{
        try{
            const {data} = await api.get("dashboard/");
            setDashboard(data);
        }
        catch(error){
            console.log(error);
        }
    };

    if(!dashboard){
        return(
            <MainLayout>
                <h3>Loading....</h3>
            </MainLayout>
        );
    };

  return (
    

    <MainLayout>

        <h2 className="mb-2">
            Today - {dashboard.today}
        </h2>

        <div className="row">

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Total Members"
                    value={dashboard.total_members}
                    icon={<FaUsers />}
                    color="#0d6efd"
                />
            </div>

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Active Members"
                    value={dashboard.active_members}
                    icon={<FaUserCheck />}
                    color="#198754"
                />
            </div>

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Membership Expired Today"
                    value={dashboard.expired_today}
                    icon={<FaTimesCircle />}
                    color="#dc3545"
                />
            </div>

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Today's Collection"
                    value={`₹ ${dashboard.today_collection}`}
                    icon={<FaRupeeSign />}
                    color="#20c997"
                />
            </div>

        </div>

        <h3 className="mt-4 mb-3">
            Membership Expiry
        </h3>

        <div className="row">

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Expiring (1-3 Days)"
                    value={dashboard.expiry_1_3}
                    icon={<FaClock />}
                    color="#ffc107"
                />
            </div>

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Expiring (4-7 Days)"
                    value={dashboard.expiry_4_7}
                    icon={<FaClock />}
                    color="#fd7e14"
                />
            </div>

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Expiring (8-15 Days)"
                    value={dashboard.expiry_8_15}
                    icon={<FaClock />}
                    color="#6f42c1"
                />
            </div>

        </div>

        <h3 className="mt-4 mb-3">
            Collections
        </h3>

        <div className="row">

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Monthly Collection"
                    value={`₹ ${dashboard.monthly_collection}`}
                    icon={<FaCalendarAlt />}
                    color="#6610f2"
                />
            </div>

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Last Month Collection"
                    value={`₹ ${dashboard.last_month_collection}`}
                    icon={<FaCalendarAlt />}
                    color="#0dcaf0"
                />
            </div>

            <div className="col-md-4 mb-4">
                <StatCard
                    title="Total Collection"
                    value={`₹ ${dashboard.total_collection}`}
                    icon={<FaRupeeSign />}
                    color="#198754"
                />
            </div>

        </div>

    </MainLayout>
  )
}
