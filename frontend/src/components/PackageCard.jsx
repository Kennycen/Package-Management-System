import React from 'react'
import { Package, Calendar, Bell, CheckCircle2 } from 'lucide-react'

const PackageCard = ({ pkg, activeStatus }) => {

  const getStatusBadge = () => {
    switch (activeStatus) {
      case 'arrived':
        return (
          <div className='text-sm text-blue-500 border border-blue-200 bg-blue-300/20 flex items-center justify-center px-3 rounded-2xl font-bold'>
            <Package className="h-4 w-4 text-blue-400 mr-1" /> Arrived
          </div>
        );
      case 'notified':
        return (
          <div className='text-sm text-yellow-500 border border-yellow-200 bg-yellow-300/20 flex items-center justify-center px-3 rounded-2xl font-bold'>
            <Bell className="h-4 w-4 text-yellow-400 mr-1" /> Tenant Notified
          </div>
        );
      case 'picked':
        return (
          <div className='text-sm text-green-500 border border-green-200 bg-green-300/20 flex items-center justify-center px-3 rounded-2xl font-bold'>
            <CheckCircle2 className="h-4 w-4 text-green-400 mr-1" /> Picked Up
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-400 rounded-lg p-6 shadow-lg hover:shadow-[4px_4px_0px_#000] cursor-pointer hover:-translate-y-1 duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{pkg.recipient}</span>
        </div>
        {getStatusBadge()}
      </div>

      <div className='mb-3 text-sm text-gray-500'>
        Apt {pkg.apartment || '101'} - {pkg.carrier}
      </div>

      <div className='mb-3 text-gray-600'>
        {pkg.description || 'Description of the package'}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{pkg.trackingNumber}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{pkg.arrivalDate}</span>
        </div>

        {(activeStatus === 'notified' || activeStatus === 'picked') && (
          <div className="flex items-center gap-2 text-yellow-600">
            <Bell className="h-4 w-4" />
            <span>Notified: {pkg.notificationDate || 'Feb 20, 2024 15:30'}</span>
          </div>
        )}

        {activeStatus === 'picked' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Picked up: {pkg.pickupDate || 'Feb 21, 2024 10:15'}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{pkg.size || 'Medium package'}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t">
        {activeStatus !== 'picked' ? (
          <button 
            className={`w-full py-2 text-center rounded-md ${
              activeStatus === 'arrived' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white transition-colors`}
          >
            {activeStatus === 'arrived' ? 'Notify Tenant' : 'Mark as Picked Up'}
          </button>
        ) : (
          <div className="text-center text-gray-500 text-sm">
            Picked up on {pkg.pickupDate || 'Feb 21, 2024 10:15'}
          </div>
        )}
      </div>
    </div>
  )
}

export default PackageCard 