import React from 'react';
import { ActivitySquare } from 'lucide-react';

interface HeaderProps {
  filterType: string;
  setFilterType: (type: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  filterType, 
  setFilterType, 
  sortOrder, 
  setSortOrder 
}) => {
  return (
    <header className="bg-[#0f172a] border-b border-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center mb-4 sm:mb-0">
        <ActivitySquare className="text-green-500 w-6 h-6 mr-2" />
        <h1 className="text-xl font-bold text-white flex items-center">
          Traffic Control Center 
          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
        </h1>
      </div>
      
      <div className="flex space-x-3">
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#1e293b] text-gray-200 py-2 pl-4 pr-8 rounded border border-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="All Violations">All Violations</option>
            <option value="Checked">Checked</option>
            <option value="Unchecked">Unchecked</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-[#1e293b] text-gray-200 py-2 pl-4 pr-8 rounded border border-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Highest Speed">Highest Speed</option>
            <option value="Lowest Speed">Lowest Speed</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;