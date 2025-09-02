import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDogContext } from '../contexts/DogContext';

const AdoptionForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, startTrial } = useDogContext();

  const dog = state.dogs.find(d => d.id === id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  if (dog.status !== 'Available') {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐕</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Dog Not Available</h3>
        <p className="text-gray-600 mb-4">
          {dog.name} is currently {dog.status.toLowerCase()}. Please check back later or view other available dogs.
        </p>
        <Link to="/" className="btn-primary">
          View Available Dogs
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      startTrial(dog.id, formData);
      
      // Show success message and redirect
      setTimeout(() => {
        navigate(`/dog/${dog.id}`, { 
          state: { 
            message: `Congratulations! You've started a 10-day trial with ${dog.name}. We'll contact you soon with more details.` 
          } 
        });
      }, 1000);
    } catch (error) {
      console.error('Error starting trial:', error);
      setErrors({ submit: 'Failed to start trial. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          ← Back to Dogs
        </Link>
      </nav>

      <div className="card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Start 10-Day Trial</h1>
          <p className="text-gray-600">
            Begin your journey with {dog.name} - a {dog.breed}
          </p>
        </div>

        {/* Dog Preview */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={dog.imageUrl}
              alt={dog.name}
              className="w-20 h-20 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop';
              }}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{dog.name}</h3>
              <p className="text-gray-600">{dog.breed} • {dog.age} years old • {dog.size}</p>
              <p className="text-sm text-gray-500">{dog.gender}</p>
            </div>
          </div>
        </div>

        {/* Trial Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">About the 10-Day Trial</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• You'll have {dog.name} for 10 days to see if it's a good fit</li>
            <li>• We'll provide all necessary supplies and support</li>
            <li>• At the end of the trial, you can choose to adopt or return</li>
            <li>• No obligation to adopt - it's completely your decision</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Starting Trial...' : 'Start 10-Day Trial'}
            </button>
            <Link
              to={`/dog/${dog.id}`}
              className="btn-secondary text-center"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Additional Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">What happens next?</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. We'll review your application and contact you within 24 hours</li>
            <li>2. We'll schedule a meet-and-greet with {dog.name}</li>
            <li>3. If approved, you'll start your 10-day trial period</li>
            <li>4. We'll provide ongoing support throughout the trial</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
