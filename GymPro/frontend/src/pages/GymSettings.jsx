import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

export default function Settings() {

    const [form, setForm] = useState({
        gym_name: "",
        address: "",
        phone: "",
        email: "",
        logo: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const { data } = await api.get("settings/");
        setForm(data);
    };

    const handleChange = (e) => {
        if (e.target.name === "logo") {
            setForm({
                ...form,
                logo: e.target.files[0],
            });
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    };

    const saveSettings = async () => {

        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            if (form[key] !== null) {
                formData.append(key, form[key]);
            }
        });

        await api.put(
            "settings/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        alert("Settings Saved");
        navigate("/settings");


    };

    return (
        <MainLayout>

            <div className="container">

                <h2>Gym Settings</h2>

                <input
                    className="form-control mb-3"
                    name="gym_name"
                    value={form.gym_name}
                    onChange={handleChange}
                    placeholder="Gym Name"
                />

                <textarea
                    className="form-control mb-3"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                />

                <input
                    className="form-control mb-3"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                />

                <input
                    className="form-control mb-3"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                />

                <input
                    type="file"
                    className="form-control mb-3"
                    name="logo"
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success"
                    onClick={saveSettings}
                >
                    Save Settings
                </button>

            </div>

        </MainLayout>
    );
}