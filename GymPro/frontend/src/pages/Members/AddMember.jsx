import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";

export default function AddMember() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        photo: null,
        member_name: "",
        dob: "",
        gender: "Male",
        phone: "",
        email: "",

        membership_duration: "",
        payment_date: new Date().toISOString().split("T")[0],
        amount_paid: "",
        payment_type: "Cash",
        remarks: "",
    });

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "photo") {
            setFormData({
                ...formData,
                photo: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            await api.post("members/add/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Member Added Successfully");

            navigate("/members");

        } catch (error) {

            // console.log(error.response?.data);
            // alert("Unable to Add Member");

            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);

            alert(JSON.stringify(error.response?.data));
        }
    };

    return (
        <MainLayout>

            <div className="container mt-4">
                <div className="card shadow">

                    <form
                        className="card-body"
                        onSubmit={handleSubmit}
                    >

                        <h2>Add New Member</h2>

                        <hr />

                        <h4 className="mb-3">Member Details</h4>

                        <div className="row">

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Photo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Member Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="member_name"
                                    value={formData.member_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Gender</label>
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

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>


                        <hr className="my-4" />

                        <h4 className="mb-3">Membership Details</h4>

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <label className="form-label">Membership Plan</label>

                                <select
                                    className="form-select"
                                    name="membership_duration"
                                    value={formData.membership_duration}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Plan</option>

                                    <option value="1">1 Month</option>
                                    <option value="2">2 Months</option>
                                    <option value="3">3 Months</option>
                                    <option value="4">4 Months</option>
                                    <option value="5">5 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="7">7 Months</option>
                                    <option value="8">8 Months</option>
                                    <option value="9">9 Months</option>
                                    <option value="10">10 Months</option>
                                    <option value="11">11 Months</option>
                                    <option value="12">12 Months (1 Year)</option>

                                </select>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">Payment Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="payment_date"
                                    value={formData.payment_date}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">Amount Paid</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount_paid"
                                    value={formData.amount_paid}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">Payment Type</label>

                                <select
                                    className="form-select"
                                    name="payment_type"
                                    value={formData.payment_type}
                                    onChange={handleChange}
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Card">Card</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">Remarks</label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="text-end mt-3">

                            <button
                                type="submit"
                                className="btn btn-success btn-lg"
                            >
                                Save Member
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </MainLayout>
    );
}