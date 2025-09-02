import React, { useState } from 'react';
import { useDogContext } from '../contexts/DogContext';
import DogCard from './DogCard';
import { DogFilters, Dog, SortOption } from '../types';

const DogList: React.FC = () => {
  const { state, dispatch, getFilteredAndSortedDogs } = useDogContext();
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filter: keyof DogFilters, value: string) => {
    const newFilters = { ...state.filters };
    if (value) {
      (newFilters as any)[filter] = value;
    } else {
      delete newFilters[filter];
    }
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const handleSortChange = (field: keyof Dog, direction: 'asc' | 'desc') => {
    dispatch({ type: 'SET_SORT', payload: { field, direction } as SortOption });
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: {} });
  };

  const filteredDogs = getFilteredAndSortedDogs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Dogs</h1>
          <p className="text-gray-600 mt-1">
            Find your perfect companion from our selection of wonderful dogs
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary mt-4 sm:mt-0"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Breed
              </label>
              <input
                type="text"
                placeholder="Search breeds..."
                value={state.filters.breed || ''}
                onChange={(e) => handleFilterChange('breed', e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select
                value={state.filters.size || ''}
                onChange={(e) => handleFilterChange('size', e.target.value)}
                className="input-field"
              >
                <option value="">All sizes</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={state.filters.gender || ''}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="input-field"
              >
                <option value="">All genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={state.filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="">All statuses</option>
                <option value="Available">Available</option>
                <option value="On Trial">On Trial</option>
                <option value="Adopted">Adopted</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear all filters
            </button>
            <div className="text-sm text-gray-600">
              {filteredDogs.length} of {state.dogs.length} dogs
            </div>
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={`${state.sortOption.field}-${state.sortOption.direction}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-') as [keyof Dog, 'asc' | 'desc'];
              handleSortChange(field, direction);
            }}
            className="input-field w-auto"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="age-asc">Age (Youngest)</option>
            <option value="age-desc">Age (Oldest)</option>
            <option value="breed-asc">Breed (A-Z)</option>
            <option value="breed-desc">Breed (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Dogs Grid */}
      {filteredDogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐕</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No dogs found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or check back later for new arrivals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DogList;
