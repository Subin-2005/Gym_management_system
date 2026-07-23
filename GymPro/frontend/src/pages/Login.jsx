import React from 'react'

import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import api from "../services/api"

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const{data} = await api.post("login/", form);

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            alert("Login Successful");

            navigate("/dashboard");
        }
        catch(error){
            alert("Invalid Username or Password");
            console.log(error);
        }
    };

  return (
    <div className='container mt-5' style={{maxWidth: "400px"}}>
        
        <div className='card shadow'>

            <div className='card-body'>

                <h3 className='text-center mb-4'>GymPro Login</h3>

                <form onSubmit={handleSubmit}>

                    <input type="text" className='form-control mb-3' placeholder='Username' name='username' value={form.username} onChange={handleChange} />
                    <input type="password" className='form-control mb-3' placeholder='Password' name='password' value={form.password} onChange={handleChange} />

                    <button className='btn btn-primary w-100' type='submit'>Login</button>

                </form>
            </div>
        </div>
      
    </div>
  )
}
