import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDogContext } from '../contexts/DogContext';

const DogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useDogContext();

  const dog = state.dogs.find(d => d.id === id);

  if (!dog) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐕</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Dog not found</h3>
        <p className="text-gray-600 mb-4">
          The dog you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn-primary">
          Back to Dogs
        </Link>
      </div>
    );
  }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          ← Back to Dogs
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={dog.imageUrl}
              alt={dog.name}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop';
              }}
            />
            <div className="absolute top-4 right-4">
              <span className={getStatusBadgeClass(dog.status)}>
                {dog.status}
              </span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Breed</div>
              <div className="font-medium">{dog.breed}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Age</div>
              <div className="font-medium">{formatAge(dog.age)}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Size</div>
              <div className="font-medium">{dog.size}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Gender</div>
              <div className="font-medium">{dog.gender}</div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{dog.name}</h1>
            <p className="text-lg text-gray-600">{dog.breed}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About {dog.name}</h3>
            <p className="text-gray-700 leading-relaxed">{dog.description}</p>
          </div>

          {/* Personality */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personality</h3>
            <p className="text-gray-700 leading-relaxed">{dog.personality}</p>
          </div>

          {/* Trial Information */}
          {dog.status === 'On Trial' && dog.trialEndDate && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Trial Period</h3>
              <p className="text-yellow-700">
                {dog.name} is currently on a 10-day trial period. The trial ends on{' '}
                <strong>{formatDate(dog.trialEndDate)}</strong>.
              </p>
            </div>
          )}

          {/* Adoption Information */}
          {dog.status === 'Adopted' && dog.adoptedBy && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Adopted</h3>
              <p className="text-blue-700">
                {dog.name} has been adopted by <strong>{dog.adoptedBy}</strong>.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {dog.status === 'Available' && (
              <Link
                to={`/adopt/${dog.id}`}
                className="btn-primary text-center"
              >
                Start 10-Day Trial
              </Link>
            )}
            
            {dog.status === 'On Trial' && (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    // Find the adoption record and complete trial
                    const adoption = state.adoptions.find(a => a.dogId === dog.id && a.status === 'Active');
                    if (adoption) {
                      // This would typically open a modal or navigate to a decision page
                      alert('Trial decision functionality would be implemented here');
                    }
                  }}
                  className="btn-primary"
                >
                  Make Decision
                </button>
              </div>
            )}

            <Link
              to="/"
              className="btn-secondary text-center"
            >
              View All Dogs
            </Link>
          </div>

          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Added to shelter:</span>
                <div className="font-medium">{formatDate(dog.createdAt)}</div>
              </div>
              <div>
                <span className="text-gray-600">Last updated:</span>
                <div className="font-medium">{formatDate(dog.updatedAt)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetail;
