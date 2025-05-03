import React, { useState } from 'react';
import { ActivitySquare } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ViolationDetails from './components/ViolationDetails';
import { Violation } from './types';
import { mockViolations } from './data/mockData';

function App() {
  const [violations, setViolations] = useState<Violation[]>(mockViolations);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [filterType, setFilterType] = useState<string>('All Violations');
  const [sortOrder, setSortOrder] = useState<string>('Newest');

  const handleViolationSelect = (violation: Violation) => {
    // 이미 선택된 위반 사항을 다시 클릭하면 닫기
    if (selectedViolation?.id === violation.id) {
      setSelectedViolation(null);
    } else {
      setSelectedViolation(violation);
    }
  };

  const handleStatusChange = (id: number, checked: boolean) => {
    setViolations(
      violations.map((violation) => {
        if (violation.id === id) {
          return { ...violation, status: checked ? 'Checked' : 'Unchecked' };
        }
        return violation;
      })
    );
    
    if (selectedViolation && selectedViolation.id === id) {
      setSelectedViolation({ ...selectedViolation, status: checked ? 'Checked' : 'Unchecked' });
    }
  };

  const handleDeleteViolation = (id: number) => {
    setViolations(violations.filter(violation => violation.id !== id));
    if (selectedViolation && selectedViolation.id === id) {
      setSelectedViolation(null);
    }
  };

  const handleCloseDetails = () => {
    setSelectedViolation(null);
  };

  const filteredViolations = violations.filter(violation => {
    if (filterType === 'All Violations') return true;
    if (filterType === 'Checked') return violation.status === 'Checked';
    if (filterType === 'Unchecked') return violation.status === 'Unchecked';
    return true;
  });

  const sortedViolations = [...filteredViolations].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === 'Oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOrder === 'Highest Speed') {
      return b.speed - a.speed;
    } else if (sortOrder === 'Lowest Speed') {
      return a.speed - b.speed;
    }
    return 0;
  });

  // Calculate statistics
  const stats = {
    totalViolations: violations.length,
    checked: violations.filter(v => v.status === 'Checked').length,
    pendingReview: violations.filter(v => v.status === 'Unchecked').length,
    avgSpeed: Math.round(
      violations.reduce((sum, v) => sum + v.speed, 0) / violations.length
    ),
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 flex flex-col">
      <Header 
        filterType={filterType} 
        setFilterType={setFilterType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className={`flex-1 ${selectedViolation ? 'md:w-1/2' : 'w-full'}`}>
          <Dashboard 
            violations={sortedViolations} 
            stats={stats} 
            onSelectViolation={handleViolationSelect}
            onDeleteViolation={handleDeleteViolation}
            selectedViolationId={selectedViolation?.id}
          />
        </div>
        
        {selectedViolation && (
          <div className="flex-1 md:w-1/2 border-l border-gray-700 h-full overflow-auto">
            <ViolationDetails 
              violation={selectedViolation} 
              onStatusChange={handleStatusChange}
              onClose={handleCloseDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;