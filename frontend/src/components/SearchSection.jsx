import React, { useState } from 'react'
import { Search, Plus, Filter, X } from 'lucide-react'

const SearchSection = ({ onAddClick, onSearch, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    carrier: '',
    size: ''
  });

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    onSearch(searchQuery);
  };

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({ carrier: '', size: '' });
    onFilterChange({ carrier: '', size: '' });
  };

  const carriers = ['UPS', 'FedEx', 'USPS', 'Amazon', 'DHL'];
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or tracking number..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleSearch}
          />
        </div>
        <div className='flex gap-4'>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`text-black px-4 py-2 rounded-lg border border-black hover:bg-gray-200 transition-colors cursor-pointer flex gap-2 ${
              (filters.carrier || filters.size) ? 'bg-red-100' : ''
            }`}
          >
            <Filter />
            Filter
            {(filters.carrier || filters.size) && 
              <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {(filters.carrier ? 1 : 0) + (filters.size ? 1 : 0)}
              </span>
            }
          </button>
          <button
            onClick={onAddClick}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer flex gap-2"
          >
            <Plus />
            Add New Package
          </button>
        </div>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg border shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            {(filters.carrier || filters.size) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carrier
              </label>
              <select
                value={filters.carrier}
                onChange={(e) => handleFilterChange('carrier', e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Carriers</option>
                {carriers.map((carrier) => (
                  <option key={carrier} value={carrier}>
                    {carrier}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Size
              </label>
              <select
                value={filters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Sizes</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchSection 