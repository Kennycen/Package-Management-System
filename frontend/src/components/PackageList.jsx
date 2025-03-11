import React, { useEffect, useState } from 'react';
import PackageCard from './PackageCard';
import { packageService } from '../services/api';
import { toast } from 'react-toastify';

const PackageList = ({ activeStatus, refreshTrigger }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await packageService.getPackagesByStatus(activeStatus);
      if (response.success) {
        setPackages(response.packages);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [activeStatus, refreshTrigger]);

  if (loading) {
    return <div className="text-center py-10">Loading packages...</div>;
  }

  if (packages.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No packages found in {activeStatus} status
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
      {packages.map((pkg) => (
        <PackageCard 
          key={pkg._id} 
          pkg={pkg} 
          activeStatus={activeStatus}
          onStatusChange={fetchPackages}
        />
      ))}
    </div>
  );
};

export default PackageList; 