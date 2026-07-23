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

  return (
    <div className="member-card shadow">
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

        <div>
            <h5>{member.member_name}</h5>
            <p>{member.membership_id}</p>
        </div>

      </div>

      <hr />

      <p>
        <FaPhone/> {member.phone}
      </p>

      <p>
        <FaCalendarAlt/> joining: {" "} {member.joining_date}
      </p>

      <div className="member-actions">

        <button className="btn btn-primary btn-sm" onClick={()=>navigate(`/members/${member.id}`)}>
            <FaEye/> View
        </button>

        <button className="btn btn-success btn-sm" onClick={()=> navigate(`/members/${member.id}/renew`)}>
            <FaRedo /> Renew
        </button>

        <button className="btn btn-success btn-sm" onClick={sendWhatsapp}>
          <FaWhatsapp/>
        </button>

        <button className="btn btn-warning btn-sm" onClick={()=>navigate(`/members/${member.id}/edit`)}>
            <FaEdit />
        </button>

        <button className="btn btn-danger btn-sm" onClick={deleteMember}>
            <FaTrash />
        </button>
        
      </div>
    </div>
  )
}
