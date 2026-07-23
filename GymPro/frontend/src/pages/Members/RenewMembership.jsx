import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";

import React from 'react'

export default function RenewMembership() {

    const {id} = useParams();

    const navigate = useNavigate();

    const [member, setMember] = useState(null);

    const [formData, setFormData] = useState(
        {
            membership_suration: "",
            payment_date: new Date().toISOString().split("T")[0],
            amount_paid: "",
            payment_type: "Cash",
            remarks: "",
        }
    );

    useEffect(()=>{
        loadMember();
    },[]);

    const loadMember = async ()=>{
        try{
            const {data} = await api.get(`members/${id}/`);
            setMember(data);
        }
        catch(error){
            console.log(error);
        }
    };

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value,});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            await api.post(`members/${id}/renew/`, formData);
            alert("Membership Renewed Successfully");
            navigate(`/members/${id}`);
        }
        catch(error){
            console.log(error);
            alert("Renewal Failed");
        }
    };

  return (
    <MainLayout>
        <div className="container mt-4">

            <div className="card shadow">

                <form className="card-body" onSubmit={handleSubmit}>

                    <h3>Renew Membership</h3>
                    <hr />

                    {
                        member && (
                            <div className="mb-3">
                                <label className="form-label">
                                    Member Name
                                </label>

                                <input
                                    className="form-control"
                                    value={member.member_name}
                                    readOnly
                                />
                            </div>
                        )
                    }

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Membership Plan</label>

                            <select name="membership_duration" className="form-select" value={formData.membership_duration} onChange={handleChange}>
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
                                <option value="12">1 Year</option>

                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Payment Date</label>
                            <input type="date" className="form-control" name="payment_date" value={formData.payment_date} onChange={handleChange} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Amount Paid</label>
                            <input type="number" className="form-control" name="amount_paid" value={formData.amount_paid} onChange={handleChange} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Payment Type</label>
                            <select className="form-select" name="payment_type" value={formData.payment_type} onChange={handleChange}>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI</option>
                                <option value="Card">Card</option>
                                {/* <option value="Cash">Cash</option> */}
                            </select>
                        </div>

                        <div className="col-12 mb-3">
                            <label className="form-label">Remarks</label>
                            <textarea name="remarks" className="form-control" rows="3" value={formData.remarks} onChange={handleChange} />
                        </div>

                    </div>

                    <div className="text-end">
                        <button className="btn btn-success" type="submit">Renew Membership</button>
                    </div>

                </form>
            </div>
        </div>
      
    </MainLayout>
  )
}





