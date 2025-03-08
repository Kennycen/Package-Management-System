import React from 'react'
import PackageCard from './PackageCard'

const PackageList = ({ activeStatus }) => {
  // This is sample data - replace with your actual data
  const packages = [
    {
      id: 1,
      trackingNumber: "1Z999AA1234567890",
      recipient: "John Doe",
      apartment: "101",
      description: "Large brown box from Amazon",
      arrivalDate: "2024-02-20",
      arrivalTime: "14:30",
      carrier: "UPS",
      size: "Medium package",
      status: "arrived"
    },
    {
      id: 2,
      trackingNumber: "9405511298370938473",
      recipient: "Jane Smith",
      apartment: "204",
      description: "Small package marked fragile",
      arrivalDate: "2024-02-20",
      arrivalTime: "15:45",
      carrier: "USPS",
      size: "Small package",
      notificationDate: "Feb 20, 2024 15:30",
      status: "notified"
    },
    {
      id: 3,
      trackingNumber: "1Z999AA1234567890",
      recipient: "Mike Johnson",
      apartment: "303",
      description: "Large box from Target",
      arrivalDate: "2024-02-20",
      arrivalTime: "14:30",
      carrier: "UPS",
      size: "Large package",
      notificationDate: "Feb 20, 2024 14:30",
      pickupDate: "Feb 21, 2024 10:15",
      status: "picked"
    },
    {
      id: 4,
      trackingNumber: "1Z999AA1234567890",
      recipient: "John Doe",
      arrivalDate: "2024-02-20",
      arrivalTime: "14:30",
      carrier: "UPS",
      status: "arrived"
    }
    // Add more sample packages as needed
  ];

  const filteredPackages = packages.filter(pkg => pkg.status === activeStatus);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
      {filteredPackages.map((pkg) => (
        <PackageCard 
          key={pkg.id} 
          pkg={pkg} 
          activeStatus={activeStatus}
        />
      ))}
    </div>
  )
}

export default PackageList 