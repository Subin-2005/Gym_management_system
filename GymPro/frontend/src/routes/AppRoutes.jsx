import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members/Members";
import MemberDetails from "../pages/Members/MemberDetails";
import RenewMembership from "../pages/Members/RenewMembership";
import EditMember from "../pages/Members/EditMember";
import AddMember from "../pages/Members/AddMember";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/Settings";
import Notifications from "../pages/notifications/Notifications";
import GymSettings from "../pages/GymSettings"
import Login from "../pages/login/Login";
import ProtectedRoute from "../components/ProtectedRoute";

import React from 'react'
import WhatsappSettings from "../pages/whatsapp/WhatsappSettings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/login" element={<Login/>}/>

            <Route path="/" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>

            <Route path="/members" element={<ProtectedRoute> <Members/> </ProtectedRoute>}/>

            <Route path="/members/:id" element={<ProtectedRoute> <MemberDetails/> </ProtectedRoute>}/>

            <Route path="/members/:id/renew" element={<ProtectedRoute> <RenewMembership/> </ProtectedRoute>}/>

            <Route path="/members/:id/edit" element={<ProtectedRoute> <EditMember/> </ProtectedRoute>}/>

            <Route path="/members/add" element={<ProtectedRoute> <AddMember/> </ProtectedRoute>}/>

            <Route path="/reports" element={<ProtectedRoute> <Reports/> </ProtectedRoute>}/>

            <Route path="/settings" element={<ProtectedRoute> <Settings/> </ProtectedRoute>}/>

            <Route path="/settings/whatsapp" element={<ProtectedRoute> <WhatsappSettings/> </ProtectedRoute>}/>

            <Route path="/notifications" element={<ProtectedRoute> <Notifications/> </ProtectedRoute>}/>

            <Route path="/settings/gym" element={<ProtectedRoute> <GymSettings/> </ProtectedRoute>}/>
        </Routes>
      
    </BrowserRouter>
  )
}








