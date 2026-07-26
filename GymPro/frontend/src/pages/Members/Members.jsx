import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import MemberCard from "./MemberCard";
import api from "../../services/api";

import React from 'react'

export default function Members() {

    const navigate = useNavigate();

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [searchParams] = useSearchParams();

    // const [filter, setFilter] = useState("");
    const [filter, setFilter] = useState(
        searchParams.get("filter") || ""
    );

    // useEffect(()=>{
    //     setFilter
    // })

    useEffect(()=>{
        loadMembers();
    }, [search, filter, searchParams]);

    const loadMembers = async ()=>{
        try{
            setLoading(true);
            const {data} = await api.get(`members/?search=${search}&filter=${filter}`);
            setMembers(data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

  return (
    <MainLayout>
        <div className="container-fluid">
            <div className="page-header">
                <h2 className="page-heading">Members</h2>
                <button
                    className="btn btn-primary add-member-button"
                    onClick={() => navigate("/members/add")}
                >
                    + Add Member
                </button>
            </div>


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
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">All Members</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="expired">Expired Members</option>
                        <option value="today">Expiring Today</option>
                        <option value="1-3">Expiring in 1-3 Days</option>
                        <option value="4-7">Expiring in 4-7 Days</option>
                        <option value="8-15">Expiring in 8-15 Days</option>
                    </select>

                </div>

            </div>

            <div className="row">
                {loading ? (
                    <div className="col-12"><div className="loading-state"><div className="spinner-border text-primary mb-3" role="status"/><span>Loading members…</span></div></div>
                ) : members.length ? (
                    members.map((member)=>(
                        <div className="col-lg-6 mb-4" key={member.id}>
                            <MemberCard member={member}/>
                        </div>
                    ))
                ) : (
                    <div className="col-12"><div className="empty-state"><div><h5 className="mb-2">No members found</h5><p className="mb-0">Try changing the search or filter, or add a new member.</p></div></div></div>
                )}
            </div>
        </div>
    </MainLayout>
  )
}









