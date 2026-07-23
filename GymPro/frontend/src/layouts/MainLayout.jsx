import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Navbar from '../components/Navbar/Navbar'

export default function MainLayout({children}) {
  return (
    <>
        <Sidebar/>

        <Navbar/>

        <div style={{marginLeft: "250px", marginTop: "70px", padding: "20px"}}>{children}</div>
    
    </>
  )
}
