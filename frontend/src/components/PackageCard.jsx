import React, { useState } from 'react'
import { Package, Calendar, Bell, CheckCircle2, Trash2 } from 'lucide-react'
import { packageService } from '../services/packageApi';
import { toast } from 'react-toastify';

const PackageCard = ({ pkg, activeStatus, onStatusChange }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = activeStatus === 'arrived' ? 'notified' : 'picked';
      const response = await packageService.updatePackageStatus(pkg._id, newStatus);
      
      if (response.success) {
        toast.success(`Package ${newStatus === 'notified' ? 'notification sent' : 'marked as picked up'}`);
        if (onStatusChange) {
          onStatusChange();
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to update package status');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await packageService.deletePackage(pkg._id);
      if (response.success) {
        toast.success('Package deleted successfully');
        if (onStatusChange) {
          onStatusChange();
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to delete package');
    }
    setShowDeleteConfirm(false);
  };

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
    <div className="border border-gray-400 rounded-lg p-6 shadow-lg hover:shadow-[4px_4px_0px_#000]  hover:-translate-y-1 duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{pkg.recipient}</span>
        </div>
        {getStatusBadge()}
      </div>

      <div className='mb-3 text-sm text-gray-500'>
        Apt {pkg.apartment} - {pkg.carrier}
      </div>

      <div className='mb-3 text-gray-600'>
        {pkg.description}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{pkg.trackingNumber}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">
            {activeStatus === 'arrived' ? 
              formatDate(pkg.arrivalDate) : 
              `Arrived: ${formatDate(pkg.arrivalDate)}`
            }
          </span>
        </div>

        {pkg.notificationDate && (activeStatus === 'notified' || activeStatus === 'picked') && (
          <div className="flex items-center gap-2 text-yellow-600">
            <Bell className="h-4 w-4" />
            <span>Notified: {formatDate(pkg.notificationDate)}</span>
          </div>
        )}

        {pkg.pickupDate && activeStatus === 'picked' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Picked up: {formatDate(pkg.pickupDate)}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{pkg.size}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t">
        {activeStatus !== 'picked' ? (
          <button 
            onClick={handleStatusChange}
            className={`w-full py-2 text-center rounded-md ${
              activeStatus === 'arrived' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white transition-colors cursor-pointer`}
          >
            {activeStatus === 'arrived' ? 'Notify Tenant' : 'Mark as Picked Up'}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="text-center text-gray-500 text-sm">
              Picked up on {formatDate(pkg.pickupDate)}
            </div>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-2 text-center rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Delete Package
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-center text-sm text-gray-600">Are you sure you want to delete this package?</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-2 text-center rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-2 text-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PackageCard 