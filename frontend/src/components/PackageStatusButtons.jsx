import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { packageService } from '../services/packageApi'

const PackageStatusButtons = () => {
  const { activeStatus, setActiveStatus } = useContext(AppContext);
  const [packageCounts, setPackageCounts] = useState({
    arrived: 0,
    notified: 0,
    picked: 0
  });

  const fetchPackageCounts = async () => {
    try {
      const arrivedResponse = await packageService.getPackagesByStatus('arrived');
      const notifiedResponse = await packageService.getPackagesByStatus('notified');
      const pickedResponse = await packageService.getPackagesByStatus('picked');

      setPackageCounts({
        arrived: arrivedResponse.packages.length,
        notified: notifiedResponse.packages.length,
        picked: pickedResponse.packages.length
      });
    } catch (error) {
      console.error('Failed to fetch package counts:', error);
    }
  };

  useEffect(() => {
    fetchPackageCounts();
  }, [activeStatus]); // Refresh counts when status changes

  const handleStatusChange = (status) => {
    setActiveStatus(status);
  };

  return (
    <div className="mb-8">
      <div className="bg-gray-100 p-2 rounded-lg">
        <div className="flex gap-1">
          <button
            onClick={() => handleStatusChange('arrived')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer ${
              activeStatus === 'arrived'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Arrived</span>
              <span className="text-sm text-gray-500">
                {packageCounts.arrived} {packageCounts.arrived === 1 ? 'package' : 'packages'}
              </span>
            </div>
          </button>
          <button
            onClick={() => handleStatusChange('notified')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer ${
              activeStatus === 'notified'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Notified</span>
              <span className="text-sm text-gray-500">
                {packageCounts.notified} {packageCounts.notified === 1 ? 'package' : 'packages'}
              </span>
            </div>
          </button>
          <button
            onClick={() => handleStatusChange('picked')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer ${
              activeStatus === 'picked'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Picked Up</span>
              <span className="text-sm text-gray-500">
                {packageCounts.picked} {packageCounts.picked === 1 ? 'package' : 'packages'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PackageStatusButtons 