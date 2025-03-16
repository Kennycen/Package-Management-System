import React, { useState, useContext } from 'react'
import DashboardNavbar from '../components/DashboardNavbar'
import SearchSection from '../components/SearchSection'
import PackageStatusButtons from '../components/PackageStatusButtons'
import PackageList from '../components/PackageList'
import AddPackageModal from '../components/AddPackageModal'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {
  const { activeStatus } = useContext(AppContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    carrier: '',
    size: ''
  });

  const handleModalClose = (shouldRefresh = false) => {
    setIsAddModalOpen(false);
    if (shouldRefresh) {
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="my-8">
          <h1 className="text-3xl font-bold mb-4">Package Dashboard</h1>
          <h3 className="text-gray-500">
            Manage incoming packages and tenant notifications
          </h3>
        </div>
        <SearchSection 
          onAddClick={() => setIsAddModalOpen(true)} 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
        <PackageStatusButtons refreshTrigger={refreshTrigger} />
        <PackageList 
          activeStatus={activeStatus} 
          refreshTrigger={refreshTrigger}
          searchQuery={searchQuery}
          filters={filters}
        />
        <AddPackageModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </div>
  )
}

export default Dashboard
