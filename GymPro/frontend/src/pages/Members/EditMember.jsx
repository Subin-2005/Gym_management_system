import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";

import React from 'react'

export default function EditMember() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        member_name: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
    });

    useEffect(()=>{
        loadMember();
    }, []);

    const loadMember = async ()=>{
        try{
            const {data} = await api.get(`members/${id}/`);
            setFormData({
                member_name: data.member_name,
                dob: data.dob,
                gender: data.gender,
                phone: data.phone,
                email: data.email,
            });
        }
        catch(error){
            console.log(error);
        }
    };

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value,});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const form = new FormData();

        form.append("member_name", formData.member_name);
        form.append("dob", formData.dob);
        form.append("gender", formData.gender);
        form.append("phone", formData.phone);
        form.append("email", formData.email);

        if (formData.photo instanceof File) {
            form.append("photo", formData.photo);
        }

        try{
            await api.put(`members/${id}/`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Member updated Successfully");
            navigate(`/members/${id}`);
        }
        catch(error){
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            alert("Update Failed");
        }
    };

  return (
    <MainLayout>
      <div className="container mt-4">

        <div className="card shadow">

            <form className="card-body" onSubmit={handleSubmit}>
                <h3>Edit Member</h3>
                <hr />

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label>Name</label>
                        <input className="form-control" name="member_name" value={formData.member_name} onChange={handleChange} />
                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Phone</label>

                        <input
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Email</label>
                        <input
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Gender</label>
                        <select
                            className="form-select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="text-end">

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Update Member
                    </button>

                </div>
            </form>
        </div>
      </div>
    </MainLayout>
  )
}








