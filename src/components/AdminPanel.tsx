import React, { useState } from 'react';
import { useDogContext } from '../contexts/DogContext';
import { Dog } from '../types';

const AdminPanel: React.FC = () => {
  const { state, dispatch } = useDogContext();
  const [activeTab, setActiveTab] = useState<'dogs' | 'adoptions'>('dogs');
  const [showAddDogForm, setShowAddDogForm] = useState(false);
  const [editingDog, setEditingDog] = useState<Dog | null>(null);
  const [newDog, setNewDog] = useState<Partial<Dog>>({
    name: '',
    breed: '',
    age: 1,
    size: 'Medium',
    gender: 'Male',
    description: '',
    personality: '',
    imageUrl: '',
  });

  const handleAddDog = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dog: Dog = {
      id: `dog-${Date.now()}`,
      name: newDog.name!,
      breed: newDog.breed!,
      age: newDog.age!,
      size: newDog.size!,
      gender: newDog.gender!,
      description: newDog.description!,
      personality: newDog.personality!,
      imageUrl: newDog.imageUrl!,
      status: 'Available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_DOG', payload: dog });
    setNewDog({
      name: '',
      breed: '',
      age: 1,
      size: 'Medium',
      gender: 'Male',
      description: '',
      personality: '',
      imageUrl: '',
    });
    setShowAddDogForm(false);
  };

  const handleUpdateDog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDog) return;

    const updatedDog: Dog = {
      ...editingDog,
      name: newDog.name!,
      breed: newDog.breed!,
      age: newDog.age!,
      size: newDog.size!,
      gender: newDog.gender!,
      description: newDog.description!,
      personality: newDog.personality!,
      imageUrl: newDog.imageUrl!,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'UPDATE_DOG', payload: updatedDog });
    setEditingDog(null);
    setNewDog({
      name: '',
      breed: '',
      age: 1,
      size: 'Medium',
      gender: 'Male',
      description: '',
      personality: '',
      imageUrl: '',
    });
  };

  const handleDeleteDog = (dogId: string) => {
    if (window.confirm('Are you sure you want to delete this dog?')) {
      dispatch({ type: 'DELETE_DOG', payload: dogId });
    }
  };

  const startEditing = (dog: Dog) => {
    setEditingDog(dog);
    setNewDog({
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      size: dog.size,
      gender: dog.gender,
      description: dog.description,
      personality: dog.personality,
      imageUrl: dog.imageUrl,
    });
  };

  const cancelEditing = () => {
    setEditingDog(null);
    setNewDog({
      name: '',
      breed: '',
      age: 1,
      size: 'Medium',
      gender: 'Male',
      description: '',
      personality: '',
      imageUrl: '',
    });
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-1">Manage dogs and adoption records</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('dogs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'dogs'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dogs ({state.dogs.length})
          </button>
          <button
            onClick={() => setActiveTab('adoptions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'adoptions'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Adoptions ({state.adoptions.length})
          </button>
        </nav>
      </div>

      {/* Dogs Tab */}
      {activeTab === 'dogs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Manage Dogs</h2>
            <button
              onClick={() => setShowAddDogForm(true)}
              className="btn-primary"
            >
              Add New Dog
            </button>
          </div>

          {/* Add/Edit Dog Form */}
          {(showAddDogForm || editingDog) && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingDog ? 'Edit Dog' : 'Add New Dog'}
              </h3>
              <form onSubmit={editingDog ? handleUpdateDog : handleAddDog} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newDog.name}
                      onChange={(e) => setNewDog({ ...newDog, name: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                    <input
                      type="text"
                      value={newDog.breed}
                      onChange={(e) => setNewDog({ ...newDog, breed: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      min="1"
                      value={newDog.age}
                      onChange={(e) => setNewDog({ ...newDog, age: parseInt(e.target.value) })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <select
                      value={newDog.size}
                      onChange={(e) => setNewDog({ ...newDog, size: e.target.value as any })}
                      className="input-field"
                      required
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={newDog.gender}
                      onChange={(e) => setNewDog({ ...newDog, gender: e.target.value as any })}
                      className="input-field"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={newDog.imageUrl}
                      onChange={(e) => setNewDog({ ...newDog, imageUrl: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newDog.description}
                    onChange={(e) => setNewDog({ ...newDog, description: e.target.value })}
                    className="input-field"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personality</label>
                  <textarea
                    value={newDog.personality}
                    onChange={(e) => setNewDog({ ...newDog, personality: e.target.value })}
                    className="input-field"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary">
                    {editingDog ? 'Update Dog' : 'Add Dog'}
                  </button>
                  <button
                    type="button"
                    onClick={editingDog ? cancelEditing : () => setShowAddDogForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Dogs Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dog
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Breed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.dogs.map((dog) => (
                    <tr key={dog.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={dog.imageUrl}
                            alt={dog.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop';
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{dog.name}</div>
                            <div className="text-sm text-gray-500">{dog.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dog.breed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dog.age} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadgeClass(dog.status)}>
                          {dog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditing(dog)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDog(dog.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Adoptions Tab */}
      {activeTab === 'adoptions' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Adoption Records</h2>
          
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dog
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trial Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Decision
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.adoptions.map((adoption) => {
                    const dog = state.dogs.find(d => d.id === adoption.dogId);
                    return (
                      <tr key={adoption.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {adoption.customerName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {adoption.customerEmail}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {dog?.name || 'Unknown Dog'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {dog?.breed || 'Unknown Breed'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{formatDate(adoption.startDate)}</div>
                          <div className="text-gray-500">to {formatDate(adoption.endDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`status-badge ${
                            adoption.status === 'Active' ? 'status-on-trial' :
                            adoption.status === 'Completed' ? 'status-adopted' :
                            'status-returned'
                          }`}>
                            {adoption.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {adoption.decision || 'Pending'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
