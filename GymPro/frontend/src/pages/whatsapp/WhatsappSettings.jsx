import { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'


import React from 'react'

export default function WhatsappSettings() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        enable_reminder: true,
        reminder_days: 3,
        template: "",
    });

    useEffect(()=>{
        loadSettings();
    }, []);

    const loadSettings = async ()=>{
        const {data} = await api.get("whatsapp/settings/");
        setForm(data);
    };

    const saveSettings = async ()=>{

        try{
            await api.put("whatsapp/settings/", form);
            alert("Settings Saved");
            navigate("/settings");
        }
        catch(error){
            console.log(error);
            alert("Unable to save settings");
        }

    };

  return (
    <MainLayout>
      
      <div className='container'>

        <h2>WhatsApp Settings</h2>

        <div className='mb-3'>

            <label htmlFor="">Enable Reminder</label>

            <input type="checkbox" checked={form.enable_reminder} onChange={(e)=>setForm({...form, enable_reminder: e.target.checked})} />
        </div>

        <div className='mb-3'>

            <label htmlFor="">Reminder Days</label>

            <input type="number" className='form-control' value={form.reminder_days} onChange={(e)=>setForm({...form, reminder_days: e.target.value})} />
        </div>

        <div className='mb-3'>
            <label htmlFor="">Message Template</label>

            <textarea className='form-control' rows="10" value={form.template} onChange={(e)=>setForm({...form, template: e.target.value})}></textarea>
        </div>

        <button className='btn btn-success' onClick={saveSettings}>Save</button>
      </div>
    </MainLayout>
  )
}
