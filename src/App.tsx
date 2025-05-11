import React, { useState, useEffect } from 'react';
import { ActivitySquare } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ViolationDetails from './components/ViolationDetails';
import { Violation } from './types';
import { mockViolations } from './data/mockData';
import Swal from 'sweetalert2';

function App() {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [filterType, setFilterType] = useState<string>('All Violations');
  const [sortOrder, setSortOrder] = useState<string>('Newest');
  const [loading, setLoading] = useState<boolean>(true);

  // /cars/ get 에서 데이터 불러오기
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/v1/crud/cars/')
        .then(res => res.json())
        .then(data => {
          // data.results 배열을 사용
          setViolations(data.results);
          setLoading(false);
        })
        .catch(err => {
          console.error('API fetch error:', err);
          setLoading(false);
        });
  }, []);

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
          return { ...violation, is_checked: checked};
        }
        return violation;
      })
    );
    
    if (selectedViolation && selectedViolation.id === id) {
      setSelectedViolation({ ...selectedViolation, is_checked: checked });
    }
  };

  const handleDeleteViolation = async (id: number) => {
    //삭제 확인
    const result = await Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/crud/cars/${id}/`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('삭제 실패');

        setViolations(violations.filter(violation => violation.id !== id));
        if (selectedViolation && selectedViolation.id === id) {
          setSelectedViolation(null);
        }
        Swal.fire('Deleted!', 'The item has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'An error occurred while deleting.', 'error');
        console.error(error);
      }
    }
  };

  const handleCloseDetails = () => {
    setSelectedViolation(null);
  };

  const filteredViolations = violations.filter(violation => {
    if (filterType === 'All Violations') return true;
    if (filterType === 'Checked') return violation.is_checked;
    if (filterType === 'Unchecked') return !violation.is_checked;
    return true;
  });

  const sortedViolations = [...filteredViolations].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortOrder === 'Oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortOrder === 'Highest speed') {
      return b.car_speed - a.car_speed;
    } else if (sortOrder === 'Lowest speed') {
      return a.car_speed - b.car_speed;
    }
    return 0;
  });

  // Calculate statistics
  const stats = {
    totalViolations: violations.length,
    checked: violations.filter(v => v.is_checked).length,
    pendingReview: violations.filter(v => !v.is_checked).length,
    avgSpeed: Math.round(
      violations.reduce((sum, v) => sum + v.car_speed, 0) / violations.length
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
        <div className={`flex-1 ${selectedViolation ? 'md:w-2/3' : 'w-full'}`}>
          <Dashboard 
            violations={sortedViolations} 
            stats={stats} 
            onSelectViolation={setSelectedViolation}
            onDeleteViolation={handleDeleteViolation}
            selectedViolationId={selectedViolation?.id}
          />
        </div>
        
        {selectedViolation && (
          <div className="md:w-1/3 border-l border-gray-700 h-full overflow-auto">
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