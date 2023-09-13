import { createContext, useContext, useReducer } from 'react';

// Define the initial state (empty array in this case)
const initialState = {
  destinations: [],
};

// Create the context
const DataContext = createContext(null);

// Create a reducer function to update the state
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DESTINATIONS':
      return { ...state, destinations: action.payload };
    default:
      return state;
  }
};

// Create a provider component to wrap your app with
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>
  );
};

// Create a custom hook to access the context
export const useData = () => {
  return useContext(DataContext);
};
