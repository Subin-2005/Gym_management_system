import React from 'react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import './MainLayout.css'

export default function MainLayout({children}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
        <Sidebar isOpen={isSidebarOpen} onNavigate={() => setIsSidebarOpen(false)}/>

        <Navbar onMenuClick={() => setIsSidebarOpen(true)}/>

        {isSidebarOpen && <button className="nav-backdrop" aria-label="Close navigation" onClick={() => setIsSidebarOpen(false)} />}
        <main className="app-content">{children}</main>
    
    </>
  )
}
