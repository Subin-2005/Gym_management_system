import React, { useEffect, useState } from 'react'

import MainLayout from '../../layouts/MainLayout';
import api from '../../services/api';

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        loadNotifications();
    }, []);

    const loadNotifications = async()=>{
        const {data} = await api.get("notifications/");
        setNotifications(data);
    };

  return (
    <MainLayout>
        <div className='container'>

            <h2 className='mb-4'>Notifications</h2>

            {
                notifications.length ===0 ? (
                    <div className='alert alert-success'>
                        No Notifications
                    </div>
                ) : (

                    notifications.map((item)=>(
                        <div key={item.member_id} className={`alert ${
                            item.status === "expired"
                                ? "alert-danger"
                                : item.status === "today"
                                ? "alert-warning"
                                : "alert-info" 
                        }`}>

                            <strong>{item.member_name}</strong>

                            <br />

                            {item.message}

                        </div>
                    ))
                )
            }
        </div>
    </MainLayout>
  )
}
