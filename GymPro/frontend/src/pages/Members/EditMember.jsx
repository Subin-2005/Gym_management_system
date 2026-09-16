import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";
import React from 'react';
import { getImageUrl, handleImageError } from "../../utils/imageUrl";

export default function EditMember() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        member_name: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        photo: null,
    });
    const [saving, setSaving] = useState(false);

    useEffect(()=>{
        loadMember();
    }, []);

    const loadMember = async ()=>{
        try{
            const {data} = await api.get(`members/${id}/`);
            setFormData({
                member_name: data.member_name || "",
                dob: data.dob || "",
                gender: data.gender || "Male",
                phone: data.phone || "",
                email: data.email || "",
                photo: data.photo || null,
            });
        }
        catch(error){
            console.log(error);
        }
    };

    const handleChange = (e)=>{
        if (e.target.name === "photo") {
            if (e.target.files && e.target.files[0]) {
                setFormData({
                    ...formData,
                    photo: e.target.files[0],
                });
            }
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setSaving(true);

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
            alert("Member updated successfully");
            navigate(`/members/${id}`);
        }
        catch(error){
            console.log(error);
            console.log(error.response?.data);
            alert("Update failed. Please check form details.");
        }
        finally {
            setSaving(false);
        }
    };

    const previewUrl = formData.photo instanceof File
        ? URL.createObjectURL(formData.photo)
        : getImageUrl(formData.photo, "/default-user.png");

  return (
    <MainLayout>
      <div className="container mt-4">

        <div className="card shadow">

            <form className="card-body p-4" onSubmit={handleSubmit}>
                <h3 className="mb-4">Edit Member</h3>
                <hr />

                <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded-3 border">
                    <img
                        src={previewUrl}
                        alt={formData.member_name || "Member Photo"}
                        width="80"
                        height="80"
                        className="rounded-circle border"
                        style={{ objectFit: "cover" }}
                        onError={(e) => handleImageError(e, "/default-user.png")}
                    />
                    <div>
                        <label className="form-label fw-bold mb-1">Profile Photo</label>
                        <input
                            type="file"
                            className="form-control form-control-sm"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange}
                        />
                        <small className="text-muted">Choose a new file to update photo</small>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Name</label>
                        <input className="form-control" name="member_name" value={formData.member_name} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Phone</label>
                        <input
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Gender</label>
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
                        <label className="form-label fw-bold">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                </div>

                <div className="text-end mt-3">
                    <button
                        className="btn btn-primary px-4"
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? "Updating..." : "Update Member"}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </MainLayout>
  );
}
