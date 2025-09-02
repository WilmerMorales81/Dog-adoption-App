import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DogProvider } from './contexts/DogContext';
import Header from './components/Header';
import DogList from './components/DogList';
import DogDetail from './components/DogDetail';
import AdoptionForm from './components/AdoptionForm';
import AdminPanel from './components/AdminPanel';
import './index.css';

function App() {
  return (
    <DogProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<DogList />} />
              <Route path="/dog/:id" element={<DogDetail />} />
              <Route path="/adopt/:id" element={<AdoptionForm />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DogProvider>
  );
}

export default App;
