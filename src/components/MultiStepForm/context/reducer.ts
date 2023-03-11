import { FormReducerActions, ReducerState } from './types';

export function formReducer(state: ReducerState, action: FormReducerActions) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'INCREASE_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'DECREASE_STEP':
      return { ...state, currentStep: state.currentStep - 1 };
    case 'TOGGLE_GENRE':
      if (state.chosenGenres.some((genre) => genre === action.payload)) {
        return {
          ...state,
          chosenGenres: state.chosenGenres.filter(
            (genre) => genre !== action.payload
          ),
        };
      }

      if (state.chosenGenres.length === 2) return state;

      return {
        ...state,
        chosenGenres: [...state.chosenGenres, action.payload],
      };
    case 'TOGGLE_ARTIST':
      if (
        state.chosenArtists.some((artist) => artist.id === action.payload.id)
      ) {
        return {
          ...state,
          chosenArtists: state.chosenArtists.filter(
            (artist) => artist.id !== action.payload.id
          ),
        };
      }

      if (state.chosenArtists.length === 3) return state;

      return {
        ...state,
        chosenArtists: [...state.chosenArtists, action.payload],
      };
    default: {
      throw Error('Unknown action');
    }
  }
}
