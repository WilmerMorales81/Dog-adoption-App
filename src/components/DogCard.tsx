import React from 'react';
import { Link } from 'react-router-dom';
import { Dog } from '../types';

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Available':
        return 'status-badge status-available';
      case 'On Trial':
        return 'status-badge status-on-trial';
      case 'Adopted':
        return 'status-badge status-adopted';
      case 'Returned':
        return 'status-badge status-returned';
      default:
        return 'status-badge status-available';
    }
  };

  const formatAge = (age: number) => {
    if (age === 1) return '1 year old';
    return `${age} years old`;
  };

  return (
    <div className="card group">
      <div className="relative">
        <img
          src={dog.imageUrl}
          alt={dog.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className={getStatusBadgeClass(dog.status)}>
            {dog.status}
          </span>
        </div>
        {dog.status === 'On Trial' && dog.trialEndDate && (
          <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
            Trial ends: {new Date(dog.trialEndDate).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{dog.name}</h3>
          <span className="text-sm text-gray-500">{dog.gender}</span>
        </div>

        <p className="text-sm text-gray-600 mb-2">{dog.breed}</p>
        <p className="text-sm text-gray-500 mb-3">{formatAge(dog.age)} • {dog.size}</p>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {dog.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {dog.breed}
            </span>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {dog.size}
            </span>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/dog/${dog.id}`}
              className="btn-secondary text-sm"
            >
              View Details
            </Link>
            {dog.status === 'Available' && (
              <Link
                to={`/adopt/${dog.id}`}
                className="btn-primary text-sm"
              >
                Start Trial
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
