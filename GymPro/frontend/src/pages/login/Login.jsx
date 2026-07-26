import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useGym } from "../../context/GymContext";

import React from 'react'

export default function Login() {

    const navigate = useNavigate();

    const {loadGym} = useGym();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    useEffect(()=>{
        const token = localStorage.getItem("access");
        if(token){
            navigate("/");
        }
    }, []);

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const {data} = await api.post("login/", form);

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("user", JSON.stringify(data.user));

            await loadGym();

            navigate("/");
        }
        catch(error){
            alert("Invalid username or password");
        }
    };

  return (
    <div className="container mt-5">
        <div className="card shadow mx-auto" style={{maxWidth: "400px"}}>

            <div className="card-body">
                <h3 className="text-center mb-4">GymPro Login</h3>

                <form onSubmit={handleSubmit}>

                    <input type="text" placeholder="Username" className="form-control mb-3" name="username" value={form.username} onChange={handleChange} />

                    <input type="password" placeholder="Password" className="form-control mb-3" name="password" value={form.password} onChange={handleChange} />

                    <button className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
      
    </div>
  )
}



