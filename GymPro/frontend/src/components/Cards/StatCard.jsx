import "./StatCard.css"

import React from 'react'

export default function StatCard({title, value, icon, color}) {
  return (

    
    <div className="card shadow-sm stat-card">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
            <h6 className="text-muted">{title}</h6>
            <h3>{value}</h3>
        </div>

        <div className="icon-box" style={{backgroundColor: color}}>{icon}</div>
      </div>
    </div>
  )
}
