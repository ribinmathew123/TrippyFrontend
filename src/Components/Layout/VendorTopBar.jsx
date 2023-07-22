import React from 'react'
import { Link } from 'react-router-dom'

function VendorTopBar() {
    const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div className='w-full '>
       <nav className="bg-blue-gray-900 shadow-2xl boarder p-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
         
          <h1 className="text-2xl font-bold text-white">VENDOR</h1>
        </div>
        <div className="flex items-center gap-4">
          {admin && (
            <Link to="/profile" className="text-white">
              {admin.name}
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default VendorTopBar
