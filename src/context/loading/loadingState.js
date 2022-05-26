import { useReducer } from 'react';
import LoadingContext from './loadingContext';
import { loadingReducer } from './loadingReducer';
import { SET_LOADING } from '../actionTypes';

export const LoadingState = ({ children }) => {
  const initialState = {
    loading: false,
  };
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  const { loading } = state;

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
