import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const PackageStatusButtons = () => {
  const { activeStatus, setActiveStatus } = useContext(AppContext);

  const handleStatusChange = (status) => {
    setActiveStatus(status);
  };

  return (
    <div className="mb-8">
      <div className="bg-gray-100 p-2 rounded-lg">
        <div className="flex gap-1">
          <button
            onClick={() => handleStatusChange('arrived')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              activeStatus === 'arrived'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Arrived</span>
              <span className="text-sm text-gray-500">12 packages</span>
            </div>
          </button>
          <button
            onClick={() => handleStatusChange('notified')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              activeStatus === 'notified'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Notified</span>
              <span className="text-sm text-gray-500">5 packages</span>
            </div>
          </button>
          <button
            onClick={() => handleStatusChange('picked')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              activeStatus === 'picked'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Picked Up</span>
              <span className="text-sm text-gray-500">8 packages</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PackageStatusButtons 