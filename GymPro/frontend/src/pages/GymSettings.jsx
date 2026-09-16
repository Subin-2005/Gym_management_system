import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useGym } from "../context/GymContext";
import React from 'react';
import { getImageUrl, handleImageError } from "../utils/imageUrl";

export default function Settings() {

    const [form, setForm] = useState({
        gym_name: "",
        address: "",
        phone: "",
        email: "",
        logo: null,
    });
    const [saving, setSaving] = useState(false);

    const {loadGym} = useGym();
    const navigate = useNavigate();

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const { data } = await api.get("settings/");
            setForm(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "logo") {
            if (e.target.files && e.target.files[0]) {
                setForm({
                    ...form,
                    logo: e.target.files[0],
                });
            }
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    };

    const saveSettings = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append("gym_name", form.gym_name || "");
            formData.append("address", form.address || "");
            formData.append("phone", form.phone || "");
            formData.append("email", form.email || "");

            if (form.logo instanceof File) {
                formData.append("logo", form.logo);
            }

            await api.put("settings/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            await loadGym();
            alert("Settings Saved Successfully");
            navigate("/settings");
        } catch (error) {
            console.error("Settings save error:", error);
            const errorMsg = error.response?.data 
                ? (typeof error.response.data === "string" ? error.response.data : JSON.stringify(error.response.data))
                : error.message || "Failed to save settings. Please try again.";
            alert("Save Failed: " + errorMsg);
        } finally {
            setSaving(false);
        }
    };

    const previewUrl = form.logo instanceof File
        ? URL.createObjectURL(form.logo)
        : getImageUrl(form.logo, "/logo.jpeg");

    return (
        <MainLayout>
            <div className="container mt-4">
                <div className="card shadow mx-auto" style={{ maxWidth: "700px" }}>
                    <div className="card-body p-4">
                        <h2 className="mb-4">Gym Settings</h2>

                        <form onSubmit={saveSettings}>
                            <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded-3 border">
                                <img
                                    src={previewUrl}
                                    alt="Gym Logo Preview"
                                    width="80"
                                    height="80"
                                    className="rounded-circle border"
                                    style={{ objectFit: "cover" }}
                                    onError={(e) => handleImageError(e, "/logo.jpeg")}
                                />
                                <div>
                                    <label className="form-label fw-bold mb-1">Gym Logo</label>
                                    <input
                                        type="file"
                                        className="form-control form-control-sm"
                                        name="logo"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                    <small className="text-muted">JPG, PNG or SVG recommended</small>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Gym Name</label>
                                <input
                                    className="form-control"
                                    name="gym_name"
                                    value={form.gym_name || ""}
                                    onChange={handleChange}
                                    placeholder="Gym Name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Address</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="address"
                                    value={form.address || ""}
                                    onChange={handleChange}
                                    placeholder="Address"
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Phone</label>
                                    <input
                                        className="form-control"
                                        name="phone"
                                        value={form.phone || ""}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email || ""}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div className="text-end mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-success px-4"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Settings"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}