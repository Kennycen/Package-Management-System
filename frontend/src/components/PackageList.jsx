import React, { useEffect, useState } from 'react';
import PackageCard from './PackageCard';
import { packageService } from '../services/packageApi';
import { toast } from 'react-toastify';

const PackageList = ({ activeStatus, refreshTrigger, searchQuery, filters }) => {
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

  const filteredPackages = packages.filter(pkg => {
    if (!pkg) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      const recipient = pkg.recipient?.toLowerCase() || '';
      const trackingNumber = pkg.trackingNumber?.toLowerCase() || '';
      const apartment = pkg.apartment?.toString().toLowerCase() || '';
      const carrier = pkg.carrier?.toLowerCase() || '';
      
      const matchesSearch = recipient.includes(query) || 
                           trackingNumber.includes(query) ||
                           apartment.includes(query) ||
                           carrier.includes(query);
      
      if (!matchesSearch) return false;
    }

    if (filters?.carrier && pkg.carrier !== filters.carrier) {
      return false;
    }

    if (filters?.size && pkg.size !== filters.size) {
      return false;
    }

    return true;
  });

  if (loading) {
    return <div className="text-center py-10">Loading packages...</div>;
  }

  if (filteredPackages.length === 0) {
    if (searchQuery || (filters?.carrier || filters?.size)) {
      return (
        <div className="text-center py-10 text-gray-500">
          No packages found matching your search and filters
        </div>
      );
    }
    return (
      <div className="text-center py-10 text-gray-500">
        No packages found in {activeStatus} status
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
      {filteredPackages.map((pkg) => (
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