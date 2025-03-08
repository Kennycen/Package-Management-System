import React from 'react'
import { Search, Filter, Plus } from 'lucide-react'

const SearchSection = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search packages..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>

          {/* Add Package Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            <span>Add Package</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchSection 