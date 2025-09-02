import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Dog, Adoption, DogFilters, SortOption } from '../types';
import { storageUtils } from '../utils/storage';
import { initialDogs } from '../data/dogs';

interface DogState {
  dogs: Dog[];
  adoptions: Adoption[];
  filters: DogFilters;
  sortOption: SortOption;
  loading: boolean;
  error: string | null;
}

type DogAction =
  | { type: 'SET_DOGS'; payload: Dog[] }
  | { type: 'ADD_DOG'; payload: Dog }
  | { type: 'UPDATE_DOG'; payload: Dog }
  | { type: 'DELETE_DOG'; payload: string }
  | { type: 'SET_ADOPTIONS'; payload: Adoption[] }
  | { type: 'ADD_ADOPTION'; payload: Adoption }
  | { type: 'UPDATE_ADOPTION'; payload: Adoption }
  | { type: 'SET_FILTERS'; payload: DogFilters }
  | { type: 'SET_SORT'; payload: SortOption }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: DogState = {
  dogs: [],
  adoptions: [],
  filters: {},
  sortOption: { field: 'name', direction: 'asc' },
  loading: false,
  error: null,
};

const dogReducer = (state: DogState, action: DogAction): DogState => {
  switch (action.type) {
    case 'SET_DOGS':
      return { ...state, dogs: action.payload };
    case 'ADD_DOG':
      return { ...state, dogs: [...state.dogs, action.payload] };
    case 'UPDATE_DOG':
      return {
        ...state,
        dogs: state.dogs.map(dog => dog.id === action.payload.id ? action.payload : dog),
      };
    case 'DELETE_DOG':
      return {
        ...state,
        dogs: state.dogs.filter(dog => dog.id !== action.payload),
      };
    case 'SET_ADOPTIONS':
      return { ...state, adoptions: action.payload };
    case 'ADD_ADOPTION':
      return { ...state, adoptions: [...state.adoptions, action.payload] };
    case 'UPDATE_ADOPTION':
      return {
        ...state,
        adoptions: state.adoptions.map(adoption => 
          adoption.id === action.payload.id ? action.payload : adoption
        ),
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_SORT':
      return { ...state, sortOption: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface DogContextType {
  state: DogState;
  dispatch: React.Dispatch<DogAction>;
  startTrial: (dogId: string, customerInfo: { name: string; email: string; phone: string }) => void;
  completeTrial: (adoptionId: string, decision: 'Adopt' | 'Return') => void;
  getFilteredAndSortedDogs: () => Dog[];
}

const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dogReducer, initialState);

  // Initialize data from localStorage
  useEffect(() => {
    storageUtils.initializeStorage(initialDogs);
    const dogs = storageUtils.getDogs();
    const adoptions = storageUtils.getAdoptions();
    dispatch({ type: 'SET_DOGS', payload: dogs });
    dispatch({ type: 'SET_ADOPTIONS', payload: adoptions });
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (state.dogs.length > 0) {
      storageUtils.saveDogs(state.dogs);
    }
  }, [state.dogs]);

  useEffect(() => {
    storageUtils.saveAdoptions(state.adoptions);
  }, [state.adoptions]);

  const startTrial = (dogId: string, customerInfo: { name: string; email: string; phone: string }) => {
    const dog = state.dogs.find(d => d.id === dogId);
    if (!dog || dog.status !== 'Available') {
      dispatch({ type: 'SET_ERROR', payload: 'Dog is not available for trial' });
      return;
    }

    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(); // 10 days

    const adoption: Adoption = {
      id: `adoption-${Date.now()}`,
      dogId,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      startDate,
      endDate,
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedDog: Dog = {
      ...dog,
      status: 'On Trial',
      trialStartDate: startDate,
      trialEndDate: endDate,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_ADOPTION', payload: adoption });
    dispatch({ type: 'UPDATE_DOG', payload: updatedDog });
  };

  const completeTrial = (adoptionId: string, decision: 'Adopt' | 'Return') => {
    const adoption = state.adoptions.find(a => a.id === adoptionId);
    if (!adoption) return;

    const updatedAdoption: Adoption = {
      ...adoption,
      status: 'Completed',
      decision,
      decisionDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const dog = state.dogs.find(d => d.id === adoption.dogId);
    if (!dog) return;

    const updatedDog: Dog = {
      ...dog,
      status: decision === 'Adopt' ? 'Adopted' : 'Available',
      adoptedBy: decision === 'Adopt' ? adoption.customerName : undefined,
      trialStartDate: undefined,
      trialEndDate: undefined,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'UPDATE_ADOPTION', payload: updatedAdoption });
    dispatch({ type: 'UPDATE_DOG', payload: updatedDog });
  };

  const getFilteredAndSortedDogs = (): Dog[] => {
    let filteredDogs = [...state.dogs];

    // Apply filters
    if (state.filters.breed) {
      filteredDogs = filteredDogs.filter(dog => 
        dog.breed.toLowerCase().includes(state.filters.breed!.toLowerCase())
      );
    }
    if (state.filters.size) {
      filteredDogs = filteredDogs.filter(dog => dog.size === state.filters.size);
    }
    if (state.filters.age) {
      filteredDogs = filteredDogs.filter(dog => dog.age <= state.filters.age!);
    }
    if (state.filters.status) {
      filteredDogs = filteredDogs.filter(dog => dog.status === state.filters.status);
    }
    if (state.filters.gender) {
      filteredDogs = filteredDogs.filter(dog => dog.gender === state.filters.gender);
    }

    // Apply sorting
    filteredDogs.sort((a, b) => {
      const aValue = a[state.sortOption.field];
      const bValue = b[state.sortOption.field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return state.sortOption.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return state.sortOption.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });

    return filteredDogs;
  };

  const value: DogContextType = {
    state,
    dispatch,
    startTrial,
    completeTrial,
    getFilteredAndSortedDogs,
  };

  return (
    <DogContext.Provider value={value}>
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = (): DogContextType => {
  const context = useContext(DogContext);
  if (context === undefined) {
    throw new Error('useDogContext must be used within a DogProvider');
  }
  return context;
};
