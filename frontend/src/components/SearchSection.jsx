import React from 'react'
import { Search, Plus, Filter } from 'lucide-react'

const SearchSection = ({ onAddClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search packages..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className='flex gap-4'>
        <button
          className="text-black px-4 py-2 rounded-lg border border-black transition-colors cursor-pointer flex gap-2"
        >
          <Filter />
          Filter
        </button>
        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex gap-2"
        >
          <Plus />
          Add New Package
        </button>
      </div>
    </div>
  );
}

export default SearchSection 