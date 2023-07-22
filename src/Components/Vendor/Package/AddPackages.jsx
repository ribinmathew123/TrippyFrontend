// import React from 'react'

function AddPackages() {
  return (
    <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Package Name</label>
      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Package Type</label>
      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Package Category</label>
      <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option>Select Type</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Date</label>
      <input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Maximum Number</label>
      <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700">Image Upload</label>
      <input type="file" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
  </div>
  
  )
}

export default AddPackages
