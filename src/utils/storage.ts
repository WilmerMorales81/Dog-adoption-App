import { Dog, Adoption } from '../types';

const DOGS_STORAGE_KEY = 'dog-adoption-dogs';
const ADOPTIONS_STORAGE_KEY = 'dog-adoption-adoptions';

export const storageUtils = {
  // Dog storage functions
  getDogs: (): Dog[] => {
    try {
      const dogs = localStorage.getItem(DOGS_STORAGE_KEY);
      return dogs ? JSON.parse(dogs) : [];
    } catch (error) {
      console.error('Error loading dogs from storage:', error);
      return [];
    }
  },

  saveDogs: (dogs: Dog[]): void => {
    try {
      localStorage.setItem(DOGS_STORAGE_KEY, JSON.stringify(dogs));
    } catch (error) {
      console.error('Error saving dogs to storage:', error);
    }
  },

  // Adoption storage functions
  getAdoptions: (): Adoption[] => {
    try {
      const adoptions = localStorage.getItem(ADOPTIONS_STORAGE_KEY);
      return adoptions ? JSON.parse(adoptions) : [];
    } catch (error) {
      console.error('Error loading adoptions from storage:', error);
      return [];
    }
  },

  saveAdoptions: (adoptions: Adoption[]): void => {
    try {
      localStorage.setItem(ADOPTIONS_STORAGE_KEY, JSON.stringify(adoptions));
    } catch (error) {
      console.error('Error saving adoptions to storage:', error);
    }
  },

  // Initialize storage with default data
  initializeStorage: (initialDogs: Dog[]): void => {
    const existingDogs = storageUtils.getDogs();
    if (existingDogs.length === 0) {
      storageUtils.saveDogs(initialDogs);
    }
  },

  // Clear all data (for testing/reset)
  clearAll: (): void => {
    localStorage.removeItem(DOGS_STORAGE_KEY);
    localStorage.removeItem(ADOPTIONS_STORAGE_KEY);
  },
};
