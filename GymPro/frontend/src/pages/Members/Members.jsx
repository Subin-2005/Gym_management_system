import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import MemberCard from "./MemberCard";
import api from "../../services/api";

import React from 'react'

export default function Members() {

    const navigate = useNavigate();

    const [members, setMembers] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    useEffect(()=>{
        loadMembers();
    }, [search, status]);

    const loadMembers = async ()=>{
        try{
            const {data} = await api.get(`members/?search=${search}&status=${status}`);
            setMembers(data);
        }
        catch(error){
            console.log(error);
        }
    };

  return (
    <MainLayout>
        <div className="container-fluid">
            <h2 className="mb-4">Members</h2>


            <div className="row mb-4">

                <div className="col-md-6">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name, Phone, Email or Membership ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Members</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                </div>

            </div>

            <div className="row">
                {
                    members.map((member)=>(
                        <div className="col-lg-6 mb-4" key={member.id}>
                            <MemberCard member={member}/>
                        </div>
                    ))
                }
            </div>
            <button
                className="btn btn-primary"
                onClick={() => navigate("/members/add")}
            >
                + Add Member
            </button>
        </div>
    </MainLayout>
  )
}









