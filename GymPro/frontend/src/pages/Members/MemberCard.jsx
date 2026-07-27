import "./MemberCard.css";
import {
    FaEye,
    FaRedo,
    FaEdit,
    FaTrash,
    FaPhone,
    FaCalendarAlt,
    FaWhatsapp
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import React from 'react'

export default function MemberCard({member}) {

  const navigate = useNavigate()

  const deleteMember = async ()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");

    if(!confirmDelete){
      return;
    };

    try{
      await api.delete(`members/${member.id}/`);
      alert("Member deleted successfully");
      window.location.reload();
    }
    catch(error){
      console.log(error);
      alert("unable to delete member");
    }
  };

  const sendWhatsapp = async ()=>{
    try{
      const {data} = await api.get(`whatsapp/message/${member.id}/`);
      window.open(data.url, "_blank");
    }
    catch(error){
      console.log(error);
    }
  };

  const formDate = (date) => {
    if(!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="member-card shadow" style={{cursor: "pointer"}} onClick={()=> navigate(`/members/${member.id}`)}>
      <div className="member-header">

        <img 
        src= {
            member.photo
                ? member.photo
                : "/default-user.png"
        }
        alt={member.member_name}
        className="member-photo" 
        />

        <div className="member-details">
            
            <div className="detail-item">
              <span className="label">Member Name</span>
              <span>{member.member_name}</span>
            </div>

            <div className="detail-item">
              <span className="label">Mobile</span>
              <span>{member.phone}</span>
            </div>

            <div className="detail-item">
              <span className="label">Member ID</span>
              <span>{member.membership_id}</span>
            </div>

            <div className="detail-item">
              <span className="label">Joined</span>
              <span>{formDate(member.joining_date)}</span>
            </div>

            {
              member.current_membership && (
                <>
                  <div className="detail-item">
                    <span className="label">Plan</span>
                    <span>{member.current_membership.membership_duration} Month(s)</span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Plan Expiry</span>
                    <span className="expiry">{formDate(member.current_membership.expiry_date)}</span>
                  </div>
                
                </>
              )
            }
        </div>

      </div>

      <hr />

      <div className="member-actions" onClick={(e)=>e.stopPropagation()}>

        <button className="action-btn" onClick={()=>window.location.href = `tel:${member.phone}`}>
            <FaPhone/>
            <span>Call</span> 
        </button>

        <button className="action-btn" onClick={sendWhatsapp}>
          <FaWhatsapp/>
          <span>WhatsApp</span>
        </button>

        <button className="action-btn" onClick={()=> navigate(`/members/${member.id}/renew`)}>
            <FaRedo /> 
            <span>Renew Plan</span>
        </button>

        <button className="action-btn" onClick={()=>navigate(`/members/${member.id}/edit`)}>
            <FaEdit />
            <span>Edit</span>
        </button>

        <button className="action-btn delete-btn" onClick={deleteMember}>
            <FaTrash />
            <span>Delete</span>
        </button>
        
      </div>
    </div>
  )
}
