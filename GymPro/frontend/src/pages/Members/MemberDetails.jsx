import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";

import { FaFilePdf } from "react-icons/fa";

import React from 'react'

export default function MemberDetails() {

    const {id} = useParams();
    // console.log(id);

    const [member, setMember] = useState(null);

    useEffect(()=>{
        loadMember();
    },[]);

    const loadMember = async ()=>{
        try{
            const {data} = await api.get(`members/${id}/`);
            // console.log("API Response:", data);
            setMember(data);
        }
        catch(error){
            console.log(error);
        }
    };

    if(!member){
        return(
            <MainLayout>
                <h3>Loading...</h3>
            </MainLayout>
        );
    };

    console.log(member.photo)


    const downloadReceipt = async ()=>{
        try{
            const response = await api.get(`receipt/${member.id}/`, {responseType: "blob"});

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", `${member.membership_id}.pdf`);

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        }
        catch(error){
            console.log(error);
            alert("Unable to download receipt");
        }
    }

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };
    
  return (
    <MainLayout>

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-3 text-center">

                            <img
                                src={
                                    member.photo
                                        ? member.photo
                                        : "/default-user.png"
                                }
                                alt={member.member_name}
                                className="img-fluid rounded-circle border"
                                style={{
                                    width: "180px",
                                    height: "180px",
                                    objectFit: "cover"
                                }}
                            />

                            <h4 className="mt-3">
                                {member.member_name}
                            </h4>

                            <span className="badge bg-success">
                                Active
                            </span>

                        </div>

                        <div className="col-md-9">
                            <h3>Member Details</h3>
                            <hr />

                            <div className="row">

                                <div className="col-md-6">
                                    <p><strong>Membership ID</strong></p>
                                    <p>{member.membership_id}</p>
                                </div>

                                <div className="col-md-6">
                                    <p><strong>Phone</strong></p>
                                    <p>{member.phone}</p>
                                </div>

                                <div className="col-md-6">
                                    <p><strong>Email</strong></p>
                                    <p>{member.email}</p>
                                </div>

                                <div className="col-md-6">
                                    <p><strong>Gender</strong></p>
                                    <p>{member.gender}</p>
                                </div>

                                <div className="col-md-6">
                                    <p><strong>Date of Birth</strong></p>
                                    <p>{formatDate(member.dob)}</p>
                                </div>

                                <div className="col-md-6">
                                    <p><strong>Joining Date</strong></p>
                                    <p>{formatDate(member.joining_date)}</p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {member.current_membership && (

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h3>Current Membership</h3>

                        <hr />

                        <div className="row">

                            <div className="col-md-6">
                                <p><strong>Plan</strong></p>
                                <p>
                                    {member.current_membership.membership_duration} Month(s)
                                </p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Payment Date</strong></p>
                                <p>{formatDate(member.current_membership.payment_date)}</p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Expiry Date</strong></p>
                                <p>{formatDate(member.current_membership.expiry_date)}</p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Payment Type</strong></p>
                                <p>{member.current_membership.payment_type}</p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Amount Paid</strong></p>
                                <p>₹ {member.current_membership.amount_paid}</p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Remarks</strong></p>
                                <p>{member.current_membership.remarks || "-"}</p>
                            </div>

                        </div>

                    </div>

                </div>

            )}

            <button className="btn btn-danger" onClick={downloadReceipt}>
                <FaFilePdf/> Download Receipt
            </button>

            <div className="card shadow mt-4">

                <div className="card-body">

                    <h3>Membership History</h3>

                    <table className="table table-bordered">

                        <thead className="table-dark">

                            <tr>

                                <th>Plan</th>

                                <th>Payment Date</th>

                                <th>Expiry Date</th>

                                <th>Amount</th>

                                <th>Payment</th>

                            </tr>

                        </thead>

                        <tbody>

                            {member.membership_history.map((history, index) => (

                                <tr key={index}>

                                    <td>
                                        {history.membership_duration} Month(s)
                                    </td>

                                    <td>
                                        {formatDate(history.payment_date)}
                                    </td>

                                    <td>
                                        {formatDate(history.expiry_date)}
                                    </td>

                                    <td>
                                        ₹ {history.amount_paid}
                                    </td>

                                    <td>
                                        {history.payment_type}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>


    </MainLayout>
);
}








